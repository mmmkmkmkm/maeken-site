import { useScrollProgress } from "../hooks/useScrollProgress";
import { useHpMissActive } from "../hooks/useHpFlash";

const SEGMENTS = 16;

/**
 * NES-style "HP" bar fixed under the nav, filling in 16 discrete blocks as
 * the page is scrolled. Purely decorative — hidden from the accessibility
 * tree and never intercepts pointer events. Briefly drops to empty and
 * shows "MISS!" when the hidden-command penalty fires.
 */
export function ScrollHpBar({ sunset = false }: { sunset?: boolean }) {
  const { progress } = useScrollProgress();
  const missActive = useHpMissActive();
  const filled = missActive ? 0 : Math.round(progress * SEGMENTS);

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 md:top-20 inset-x-0 z-40 pointer-events-none flex justify-center px-3 pt-1.5"
    >
      <div className="hp-bar flex items-center gap-1.5 bg-[var(--color-bg)] border-4 border-[var(--color-ink)] px-2 py-1">
        {sunset && (
          <span
            className="block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: "#e8842c" }}
          />
        )}
        <span className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-[var(--color-ink)] tracking-[0.1em]">
          HP
        </span>
        <div className="flex gap-[2px]">
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className="hp-bar__segment block w-[6px] sm:w-2 h-2.5 sm:h-3 border border-[var(--color-ink)]"
              style={{
                backgroundColor:
                  i < filled ? "var(--color-accent)" : "var(--color-bg-alt)",
              }}
            />
          ))}
        </div>
        {missActive && (
          <span className="font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] text-[var(--color-accent)] tracking-[0.1em]">
            MISS!
          </span>
        )}
      </div>
    </div>
  );
}
