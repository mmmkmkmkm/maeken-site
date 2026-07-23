import { useEffect, useState } from "react";
import { playBgm } from "../hooks/useBgm";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** How many viewport-heights of extra scroll track drive the zoom, on top
 * of the pinned 100dvh itself. */
const ZOOM_TRACK_VH = 1.4;
/** MAEKEN grows from 1x to this multiple while the section is pinned. */
const MAX_TITLE_SCALE = 5;
/** How many times faster the chrome (eyebrow/tagline/press start) fades out
 * than the title zooms in — higher means it clears out earlier. */
const CHROME_FADE_SPEED = 4;

function useViewportHeight() {
  const [vh, setVh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800,
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vh;
}

/**
 * Hero section. Pins for an extra stretch of scroll while "MAEKEN" zooms in
 * — same trick as macmousefix.com's title, but stepped to fit the 8bit feel
 * instead of a smooth ease.
 */
export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScrollProgress();
  const reduceMotion = useReducedMotion();
  const vh = useViewportHeight();

  useEffect(() => {
    // Trigger on next frame so the CSS transition actually runs.
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollToWorks = () => {
    // First interaction on the page — the one guaranteed spot autoplay
    // will be allowed, so kick off the BGM here as a bonus to the toggle.
    playBgm();
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  };

  const zoomTrackPx = ZOOM_TRACK_VH * vh;
  const rawProgress = zoomTrackPx > 0 ? scrollY / zoomTrackPx : 0;
  const zoomProgress = reduceMotion
    ? 0
    : Math.min(1, Math.max(0, rawProgress));
  const titleScale = 1 + zoomProgress * (MAX_TITLE_SCALE - 1);
  // Rest of the hero copy clears out much faster than the title zooms so
  // MAEKEN has the screen to itself early into the scroll.
  const chromeOpacity = Math.max(0, 1 - zoomProgress * CHROME_FADE_SPEED);

  return (
    <section
      id="hero"
      aria-label="トップ"
      className="relative"
      style={{ height: reduceMotion ? undefined : `calc(100dvh + ${zoomTrackPx}px)` }}
    >
      <div
        className="sticky top-0 min-h-[100dvh] flex items-center justify-center bg-[var(--color-bg)] pt-16 md:pt-20 px-6 overflow-hidden"
      >
        {/* faint pixel grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-[1000px] w-full text-center py-16 md:py-0">
          <p
            className={`hero-anim text-[10px] md:text-sm tracking-[0.25em] text-[var(--color-corgi)] mb-4 md:mb-6 font-[family-name:var(--font-pixel)] ${mounted ? "is-in" : ""}`}
            data-delay="1"
            style={{ opacity: mounted ? chromeOpacity : undefined }}
          >
            前田健太朗 / MUSIC CREATOR
          </p>
          <div
            className={`hero-anim ${mounted ? "is-in" : ""}`}
            data-delay="2"
          >
            <h1
              className="font-[family-name:var(--font-title)] leading-tight text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2rem, 9vw, 5.5rem)",
                transform: `scale(${titleScale})`,
              }}
            >
              MAEKEN
            </h1>
          </div>
          <p
            className={`hero-anim mt-6 md:mt-8 text-xs md:text-lg text-[var(--color-ink)] tracking-[0.15em] font-[family-name:var(--font-pixel)] ${mounted ? "is-in" : ""}`}
            data-delay="3"
            style={{ opacity: mounted ? chromeOpacity : undefined }}
          >
            COMPOSER <span aria-hidden="true">/</span> ARRANGER{" "}
            <span aria-hidden="true">/</span> BASSIST
          </p>

          <button
            type="button"
            onClick={scrollToWorks}
            className={`hero-anim blink mt-14 md:mt-20 inline-block text-sm md:text-xl tracking-[0.2em] text-[var(--color-accent)] font-[family-name:var(--font-pixel)] bg-transparent border-0 p-2 ${mounted ? "is-in" : ""}`}
            data-delay="4"
            style={{
              opacity: mounted ? chromeOpacity : undefined,
              pointerEvents: chromeOpacity < 0.2 ? "none" : undefined,
            }}
          >
            - PRESS START -
          </button>
        </div>
      </div>
    </section>
  );
}
