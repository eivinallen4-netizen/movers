"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-12 items-center gap-2 bg-white px-6 text-sm font-bold uppercase text-ink transition hover:bg-sky-100"
    >
      Download / print checklist
    </button>
  );
}
