type IconProps = {
  className?: string;
};

/** A single filled pixel row, expressed as an x-range on the 16x16 grid. */
type Row = { y: number; x: number; w: number };

function Rows({ rows, fill }: { rows: Row[]; fill: string }) {
  return (
    <>
      {rows.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={fill} />
      ))}
    </>
  );
}

const SHARED_SVG_PROPS = {
  viewBox: "0 0 16 16",
  shapeRendering: "crispEdges" as const,
};

/** 16x16 dot-art filled disc with three punched-out sound-wave arcs, à la
 * Spotify. The disc is a solid fill; the arcs are real transparent gaps cut
 * out of it (not an overlay rect), so the icon stays legible — bold disc,
 * crisp bars — against any background, including an inverted hover state. */
export function SpotifyIcon({ className }: IconProps) {
  const disc: Row[] = [
    { y: 2, x: 5, w: 6 },
    { y: 3, x: 3, w: 10 },
    { y: 4, x: 2, w: 12 },
    { y: 5, x: 1, w: 14 },
    // y6: full disc row (x1-14) minus outer arc gap (x3-12)
    { y: 6, x: 1, w: 2 },
    { y: 6, x: 12, w: 2 },
    { y: 7, x: 1, w: 14 },
    // y8: full disc row (x1-14) minus middle arc gap (x4-11)
    { y: 8, x: 1, w: 3 },
    { y: 8, x: 11, w: 3 },
    { y: 9, x: 1, w: 14 },
    // y10: full disc row (x1-14) minus inner arc gap (x6-9)
    { y: 10, x: 1, w: 5 },
    { y: 10, x: 9, w: 5 },
    { y: 11, x: 1, w: 14 },
    { y: 12, x: 2, w: 12 },
    { y: 13, x: 3, w: 10 },
    { y: 14, x: 5, w: 6 },
  ];
  return (
    <svg {...SHARED_SVG_PROPS} className={className} aria-hidden="true">
      <Rows rows={disc} fill="currentColor" />
    </svg>
  );
}

/** 16x16 dot-art apple silhouette with a bite taken out of the upper right,
 * plus stem + leaf, à la Apple Music. */
export function AppleMusicIcon({ className }: IconProps) {
  const rows: Row[] = [
    { y: 2, x: 9, w: 2 },
    { y: 3, x: 8, w: 1 },
    { y: 4, x: 6, w: 2 },
    // y4: leaf occupies x9-10, no body yet under the bite
    { y: 5, x: 4, w: 8 },
    // y6-8: right side bitten away in a shrinking-then-growing arc
    { y: 6, x: 3, w: 7 },
    { y: 7, x: 3, w: 6 },
    { y: 8, x: 3, w: 7 },
    { y: 9, x: 3, w: 10 },
    { y: 10, x: 3, w: 10 },
    { y: 11, x: 3, w: 9 },
    { y: 12, x: 4, w: 7 },
    { y: 13, x: 6, w: 4 },
  ];
  return (
    <svg {...SHARED_SVG_PROPS} className={className} aria-hidden="true">
      <Rows rows={rows} fill="currentColor" />
    </svg>
  );
}

/** 16x16 dot-art rounded rect with a carved play triangle, à la YouTube.
 * The triangle is a true gap (not an overlay rect), so the icon stays
 * legible against any background — including an inverted hover state. */
export function YoutubeIcon({ className }: IconProps) {
  const body: Row[] = [
    { y: 3, x: 3, w: 10 },
    { y: 4, x: 1, w: 14 },
    { y: 5, x: 1, w: 14 },
    // y6-10: full width (x1-14) minus the right-pointing play triangle
    { y: 6, x: 1, w: 5 },
    { y: 6, x: 7, w: 8 },
    { y: 7, x: 1, w: 5 },
    { y: 7, x: 8, w: 7 },
    { y: 8, x: 1, w: 5 },
    { y: 8, x: 9, w: 6 },
    { y: 9, x: 1, w: 5 },
    { y: 9, x: 8, w: 7 },
    { y: 10, x: 1, w: 5 },
    { y: 10, x: 7, w: 8 },
    { y: 11, x: 1, w: 14 },
    { y: 12, x: 3, w: 10 },
  ];
  return (
    <svg {...SHARED_SVG_PROPS} className={className} aria-hidden="true">
      <Rows rows={body} fill="currentColor" />
    </svg>
  );
}
