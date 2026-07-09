import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const CHAR_MS = 40;
const CURSOR_BLINK_MS = 900; // ~3 blinks at 0.3s/cycle

type Props = {
  text: string;
  id?: string;
  className?: string;
};

/**
 * Section heading that types itself out one character at a time (steps
 * easing — no fade, each char just appears) the first time it scrolls into
 * view, then blinks a "_" cursor a few times before settling.
 */
export function TypewriterHeading({ text, id, className = "" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? text.length : 0);
  const [showCursor, setShowCursor] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || firedRef.current) return;
          firedRef.current = true;
          observer.unobserve(el);

          setShowCursor(true);
          let i = 0;
          const timer = window.setInterval(() => {
            i += 1;
            setCount(i);
            if (i >= text.length) {
              window.clearInterval(timer);
              window.setTimeout(() => setShowCursor(false), CURSOR_BLINK_MS);
            }
          }, CHAR_MS);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, reduceMotion]);

  return (
    <h2 ref={ref} id={id} className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {showCursor && <span className="typewriter-cursor">_</span>}
      </span>
      <span className="sr-only">{text}</span>
    </h2>
  );
}
