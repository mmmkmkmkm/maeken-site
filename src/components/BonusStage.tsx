import { useEffect, useRef, useState } from "react";
import { quantize, useScrollProgress } from "../hooks/useScrollProgress";
import { useReducedMotion } from "../hooks/useReducedMotion";

const VIDEO_SRC = "./assets/video/corgi-walk-pixel.mp4";

function CrtTv({
  scale,
  opacity,
  playing,
}: {
  scale: number;
  opacity: number;
  playing: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <div
      className="relative"
      style={{ opacity, transform: `scale(${scale})` }}
    >
      <div className="crt-tv relative w-64 h-52 sm:w-80 sm:h-64 bg-[#8b6f47] border-4 border-[var(--color-ink)] p-4 sm:p-5 pb-8 sm:pb-10">
        {/* screen */}
        <div className="relative w-full h-full bg-[#101010] border-4 border-[var(--color-ink)] overflow-hidden">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none crt-scanlines"
          />
          <p className="absolute bottom-1.5 left-0 right-0 text-center font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] tracking-[0.15em] text-[var(--color-accent)]">
            COMING SOON: CORGI
          </p>
        </div>
        {/* channel knobs */}
        <div className="absolute bottom-2 right-3 sm:right-4 flex gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--color-ink)] border-2 border-[var(--color-bg)]" />
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--color-ink)] border-2 border-[var(--color-bg)]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Short "CORGI CHANNEL" interlude between Works and About: a pixel CRT TV
 * pops in with a chunky steps() scale as the section scrolls into view, then
 * plays a muted looping preview clip behind a scanline overlay.
 */
export function BonusStage() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScrollProgress();
  const [localProgress, setLocalProgress] = useState(0);
  const metricsRef = useRef({ top: 0, height: 0 });

  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      metricsRef.current = { top: el.offsetTop, height: el.offsetHeight };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const { top, height } = metricsRef.current;
    const viewport = window.innerHeight;
    const scrollable = height - viewport;
    const p = scrollable > 0 ? (scrollY - top) / scrollable : 0;
    setLocalProgress(Math.min(1, Math.max(0, p)));
  }, [scrollY, reduceMotion]);

  const qEnter = quantize(Math.min(localProgress / 0.4, 1), 4);
  const tvScale = 0.8 + 0.2 * qEnter;
  const tvOpacity = localProgress > 0.02 ? 1 : 0;
  const isPlaying = localProgress > 0.05 && localProgress < 0.97;

  if (reduceMotion) {
    return (
      <section
        aria-hidden="true"
        className="bg-[var(--color-bg-alt)] border-t-4 border-[var(--color-ink)] py-16 px-6 flex flex-col items-center justify-center gap-6"
      >
        <p className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs tracking-[0.2em] text-[var(--color-accent)] mb-2">
          CORGI CHANNEL
        </p>
        <CrtTv scale={1} opacity={1} playing={false} />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="relative bg-[var(--color-bg-alt)] border-t-4 border-[var(--color-ink)] h-[150vh]"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col items-center justify-center px-6">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs tracking-[0.2em] text-[var(--color-accent)] mb-6">
          CORGI CHANNEL
        </p>
        <CrtTv scale={tvScale} opacity={tvOpacity} playing={isPlaying} />
      </div>
    </section>
  );
}
