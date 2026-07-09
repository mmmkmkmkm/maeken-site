import { useEffect, useState } from "react";
import { playBgm } from "../hooks/useBgm";

/**
 * Hero section — kept as its own component so it can later be swapped for a
 * scroll-scrubbed hero without touching the rest of the page.
 */
export function Hero() {
  const [mounted, setMounted] = useState(false);

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

  return (
    <section
      id="hero"
      aria-label="トップ"
      className="relative min-h-[100dvh] flex items-center justify-center bg-[var(--color-bg)] pt-16 md:pt-20 px-6 overflow-hidden"
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
        >
          前田健太朗 / MUSIC CREATOR
        </p>
        <h1
          className={`hero-anim font-[family-name:var(--font-title)] leading-tight text-[var(--color-ink)] ${mounted ? "is-in" : ""}`}
          data-delay="2"
          style={{ fontSize: "clamp(2rem, 9vw, 5.5rem)" }}
        >
          MAEKEN
        </h1>
        <p
          className={`hero-anim mt-6 md:mt-8 text-xs md:text-lg text-[var(--color-ink)] tracking-[0.15em] font-[family-name:var(--font-pixel)] ${mounted ? "is-in" : ""}`}
          data-delay="3"
        >
          COMPOSER <span aria-hidden="true">/</span> ARRANGER{" "}
          <span aria-hidden="true">/</span> BASSIST
        </p>

        <button
          type="button"
          onClick={scrollToWorks}
          className={`hero-anim blink mt-14 md:mt-20 inline-block text-sm md:text-xl tracking-[0.2em] text-[var(--color-accent)] font-[family-name:var(--font-pixel)] bg-transparent border-0 p-2 ${mounted ? "is-in" : ""}`}
          data-delay="4"
        >
          - PRESS START -
        </button>
      </div>
    </section>
  );
}
