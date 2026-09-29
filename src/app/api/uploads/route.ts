import { LIMITS } from "@/lib/quote";
import { photosEnabled, uploadPhoto } from "@/lib/server/photos";
import { clientIp, rateLimit, tooMany } from "@/lib/server/rate-limit";

/*
 * One photo per request (multipart field "file"). The browser shrinks photos before
 * sending, and one-at-a-time keeps every request under Vercel's 4.5 MB body limit.
 * Returns { url } for the wizard to include in the quote.
 */

const IMAGE_TYPES = /^image\/(jpeg|png|webp|gif|heic|heif|avif)$/;

export async function POST(req: Request) {
  if (!photosEnabled()) {
    return Response.json({ error: "Photo uploads aren't set up yet." }, { status: 503 });
  }
  if (!rateLimit(`up:${clientIp(req)}`, 40, 10 * 60_000)) return tooMany();

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > LIMITS.photoBytes + 64 * 1024) {
    return Response.json({ error: "That photo is too large." }, { status: 413 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await req.formData()).get("file");
  } catch {
    return Response.json({ error: "Upload a photo file." }, { status: 400 });
  }
  if (!(file instanceof Blob) || file.size === 0) {
    return Response.json({ error: "Upload a photo file." }, { status: 400 });
  }
  if (!IMAGE_TYPES.test(file.type)) {
    return Response.json({ error: "Only photos (JPG, PNG, HEIC, WebP) can be uploaded." }, { status: 415 });
  }
  if (file.size > LIMITS.photoBytes) {
    return Response.json({ error: "That photo is too large." }, { status: 413 });
  }

  try {
    return Response.json({ url: await uploadPhoto(file) });
  } catch (err) {
    console.error("[uploads]", err);
    return Response.json({ error: "We couldn't save that photo. Please try again." }, { status: 502 });
  }
}
