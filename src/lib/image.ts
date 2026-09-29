/*
 * Browser-side photo shrinking. Phone photos are 3–12 MB; a 1600px JPEG is ~300–600 KB and
 * still shows everything the crew needs. Smaller uploads = faster on mobile data, fewer
 * free-tier credits used, and always under the server's size cap.
 */

import { LIMITS } from "./quote";

const MAX_SIDE = 1600;
const QUALITY = 0.82;

export async function shrinkPhoto(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", QUALITY));
    if (blob && (blob.size < file.size || file.size > LIMITS.photoBytes)) return blob;
  } catch {
    // Browser can't decode it (e.g. HEIC in desktop Chrome). Send the original if it fits;
    // the photo host converts it.
  }
  if (file.size <= LIMITS.photoBytes) return file;
  throw new Error("That photo is too large. Try a smaller one or a screenshot.");
}

export async function uploadPhoto(file: File): Promise<string> {
  const blob = await shrinkPhoto(file);
  const form = new FormData();
  const name = blob === file ? file.name : file.name.replace(/\.\w+$/, "") + ".jpg";
  form.append("file", blob, name);
  const res = await fetch("/api/uploads", { method: "POST", body: form });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed. Please try again.");
  return data.url;
}
