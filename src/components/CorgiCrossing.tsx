import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useReducedMotion } from "../hooks/useReducedMotion";

const GRID = 16;
const CORGI_FALLBACK_WIDTH = 64;
const BOY_FALLBACK_WIDTH = 62;
const CORGI_SRC = "./assets/pixel/corgi-hop.png";
const BOY_SRC = "./assets/pixel/boy-run.png";
/** How far behind the corgi the boy trails, in pixels. */
const BOY_CHASE_OFFSET = 160;

function useSpriteWidth(fallback: number) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState(fallback);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (imgRef.current?.complete) {
      const w = imgRef.current.getBoundingClientRect().width;
      if (w) setWidth(w);
    }
  }, [viewportWidth]);

  return { imgRef, width, viewportWidth, setWidth };
}

/**
 * Two sprites cross fixed strips as the page scrolls, both traveling
 * left-to-right in step with scroll progress, sharing the same bottom
 * strip: a hopping corgi out front, and a bass-toting runner chasing a
 * step behind it. The runner has no separate entrance animation — it
 * simply trails the corgi's x position by a fixed offset, so it slides
 * in from off-screen left the same way the corgi does as scroll
 * progresses. Both snap to a 16px grid for a chunky, sprite feel and
 * freeze near the right edge under reduced-motion.
 */
export function CorgiCrossing() {
  const { progress } = useScrollProgress();
  const reduceMotion = useReducedMotion();

  const corgi = useSpriteWidth(CORGI_FALLBACK_WIDTH);
  const boy = useSpriteWidth(BOY_FALLBACK_WIDTH);
  const [boyFailed, setBoyFailed] = useState(false);

  const corgiTravel = Math.max(corgi.viewportWidth - corgi.width, 0);
  // progress 0 -> left edge, progress 1 -> right edge.
  const corgiRestX = corgiTravel - 16;
  const corgiX = reduceMotion
    ? corgiRestX
    : Math.floor((progress * corgiTravel) / GRID) * GRID;

  // The boy trails the corgi by a fixed pixel offset rather than following
  // his own progress curve, so at progress 0 he sits off-screen to the
  // left (translateX negative) and naturally slides into view as the
  // corgi advances -- no opacity fade needed.
  const boyX = reduceMotion
    ? Math.max(corgiRestX - BOY_CHASE_OFFSET, 0)
    : Math.floor((corgiX - BOY_CHASE_OFFSET) / GRID) * GRID;

  return (
    <>
      {!boyFailed && (
        <div
          aria-hidden="true"
          className="fixed bottom-2 left-0 z-20 pointer-events-none"
          style={{
            transform: `translateX(${boyX}px)`,
          }}
        >
          <img
            ref={boy.imgRef}
            src={BOY_SRC}
            alt=""
            onLoad={(e) => {
              const w = e.currentTarget.getBoundingClientRect().width;
              if (w) boy.setWidth(w);
            }}
            onError={() => setBoyFailed(true)}
            className={`h-14 w-auto ${reduceMotion ? "" : "boy-run-bounce"}`}
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className="fixed bottom-2 left-0 z-30 pointer-events-none"
        style={{ transform: `translateX(${corgiX}px)` }}
      >
        <div style={{ transform: "scaleX(-1)" }}>
          <img
            ref={corgi.imgRef}
            src={CORGI_SRC}
            alt=""
            onLoad={(e) => {
              const w = e.currentTarget.getBoundingClientRect().width;
              if (w) corgi.setWidth(w);
            }}
            className={`h-10 sm:h-12 w-auto ${reduceMotion ? "" : "corgi-hop-bounce"}`}
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>
    </>
  );
}
