import Image from "next/image";

export type ResolvedMedia = { alt: string; tone: string; image?: string; video?: string };

export const hasMedia = (m: ResolvedMedia) => Boolean(m.image || m.video);

/** Fills its (relative) parent with the slot's video or photo; renders nothing if neither exists. */
export function MediaFill({ media, sizes = "100vw" }: { media: ResolvedMedia; sizes?: string }) {
  if (media.video) {
    return (
      <video
        src={media.video}
        poster={media.image}
        aria-label={media.alt}
        controls
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  if (media.image) {
    return <Image src={media.image} alt={media.alt} fill sizes={sizes} className="object-cover" />;
  }
  return null;
}
