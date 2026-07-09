type Kind = "note" | "star" | "flower";

const PATHS: Record<Kind, { x: number; y: number }[]> = {
  // 8x8 grids, hand-placed pixels
  note: [
    { x: 3, y: 0 }, { x: 4, y: 0 },
    { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
    { x: 3, y: 2 }, { x: 5, y: 2 },
    { x: 3, y: 3 }, { x: 5, y: 3 },
    { x: 3, y: 4 }, { x: 5, y: 4 },
    { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 },
    { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 },
    { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 },
  ],
  star: [
    { x: 3, y: 0 }, { x: 4, y: 0 },
    { x: 3, y: 1 }, { x: 4, y: 1 },
    { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
    { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 },
    { x: 2, y: 5 }, { x: 5, y: 5 },
    { x: 3, y: 6 }, { x: 4, y: 6 },
    { x: 2, y: 7 }, { x: 5, y: 7 },
  ],
  flower: [
    { x: 3, y: 0 }, { x: 4, y: 0 },
    { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 },
    { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
    { x: 1, y: 3 }, { x: 6, y: 3 },
    { x: 2, y: 4 }, { x: 5, y: 4 },
    { x: 3, y: 5 }, { x: 4, y: 5 },
    { x: 3, y: 6 }, { x: 4, y: 6 },
    { x: 3, y: 7 }, { x: 4, y: 7 },
  ],
};

/**
 * Tiny 8x8 pixel-grid decorative sprite (note / star / flower). Purely
 * decorative — dropped sparingly next to section headings for a hand-made,
 * pop feel. Hidden from the accessibility tree.
 */
export function PixelDecor({
  kind,
  className = "",
  color = "var(--color-accent)",
}: {
  kind: Kind;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 8"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {PATHS[kind].map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width={1} height={1} fill={color} />
      ))}
    </svg>
  );
}
