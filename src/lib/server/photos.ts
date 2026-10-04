import { createHash } from "node:crypto";

/*
 * Customer photo hosting on Cloudinary's free plan (25 monthly credits ≈ 25 GB storage or
 * bandwidth, no card required). The server signs every upload, so the API secret never
 * reaches the browser and nobody can use our account as a free image host.
 *
 * Env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

const FOLDER = "quote-photos";

function config() {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  return cloud && key && secret ? { cloud, key, secret } : null;
}

export const photosEnabled = () => config() !== null;

/** Only URLs under this prefix are accepted in a quote, so people can't submit arbitrary links. */
export function photoUrlPrefix() {
  const c = config();
  return c ? `https://res.cloudinary.com/${c.cloud}/image/upload/` : undefined;
}

export async function uploadPhoto(file: Blob): Promise<string> {
  const c = config();
  if (!c) throw new Error("Photo storage is not configured.");

  const timestamp = Math.floor(Date.now() / 1000).toString();
  // Signed params must be sorted alphabetically. Cloudinary also downsizes anything huge.
  const params: Record<string, string> = {
    folder: FOLDER,
    timestamp,
    transformation: "c_limit,w_2000,h_2000",
  };
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const signature = createHash("sha1").update(toSign + c.secret).digest("hex");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", c.key);
  form.append("signature", signature);
  for (const [k, v] of Object.entries(params)) form.append(k, v);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${c.cloud}/image/upload`, { method: "POST", body: form });
  const data = (await res.json().catch(() => ({}))) as { secure_url?: string; error?: { message?: string } };
  if (!res.ok || !data.secure_url) throw new Error(data.error?.message ?? `Cloudinary upload failed (${res.status})`);
  return data.secure_url;
}
