import fs from "node:fs";
import path from "node:path";
import { MEDIA, type MediaKey } from "@/content/media";
import type { ResolvedMedia } from "@/components/media-fill";

const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const VIDEO_EXT = [".mp4", ".webm"];
const DIR = path.join(process.cwd(), "public", "media");

function find(key: string, exts: string[]) {
  const ext = exts.find((e) => fs.existsSync(path.join(DIR, key + e)));
  return ext && `/media/${key}${ext}`;
}

/** Looks for public/media/<key>.<ext> and falls back to the slot's placeholder tone. */
export function media(key: MediaKey): ResolvedMedia {
  return { ...MEDIA[key], image: find(key, IMAGE_EXT), video: find(key, VIDEO_EXT) };
}
