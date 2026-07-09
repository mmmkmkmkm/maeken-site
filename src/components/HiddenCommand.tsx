import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { triggerHpMiss } from "../hooks/useHpFlash";

const TARGET = "CORGI";
const CORGI_SRC = "./assets/pixel/corgi-hop.png";

type Drop = { id: number; left: number; delay: number; duration: number; top: number };

/**
 * Small "cheat code" box near the footer. Typing CORGI triggers a corgi
 * rain; any other 5-char guess shakes the screen and flashes the HP bar to
 * empty, and three misses in a row shows a GAME OVER banner. Everything
 * (shake, falling motion) is skipped under reduced-motion — only the text
 * feedback remains.
 */
export function HiddenCommand() {
  const [value, setValue] = useState("");
  const [wrongStreak, setWrongStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [missText, setMissText] = useState(false);
  const [raining, setRaining] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const reduceMotion = useReducedMotion();

  const shakeTimeout = useRef<number | undefined>(undefined);
  const missTimeout = useRef<number | undefined>(undefined);
  const gameOverTimeout = useRef<number | undefined>(undefined);
  const rainTimeout = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(shakeTimeout.current);
      window.clearTimeout(missTimeout.current);
      window.clearTimeout(gameOverTimeout.current);
      window.clearTimeout(rainTimeout.current);
      document.body.classList.remove("screen-shake");
    },
    [],
  );

  const startRain = () => {
    const count = 15 + Math.floor(Math.random() * 6); // 15-20
    setDrops(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 94,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1,
        top: 10 + ((i * 37) % 70),
      })),
    );
    setRaining(true);
    window.clearTimeout(rainTimeout.current);
    rainTimeout.current = window.setTimeout(() => setRaining(false), 3000);
  };

  const doMiss = () => {
    triggerHpMiss();
    setMissText(true);
    window.clearTimeout(missTimeout.current);
    missTimeout.current = window.setTimeout(() => setMissText(false), 900);

    if (!reduceMotion) {
      document.body.classList.add("screen-shake");
      window.clearTimeout(shakeTimeout.current);
      shakeTimeout.current = window.setTimeout(() => {
        document.body.classList.remove("screen-shake");
      }, 400);
    }
  };

  const doGameOver = () => {
    setGameOver(true);
    window.clearTimeout(gameOverTimeout.current);
    gameOverTimeout.current = window.setTimeout(() => setGameOver(false), 2800);
  };

  const submit = () => {
    const guess = value.trim().toUpperCase();
    setValue("");
    if (!guess) return;

    if (guess === TARGET) {
      setWrongStreak(0);
      startRain();
      return;
    }

    const next = wrongStreak + 1;
    if (next >= 3) {
      setWrongStreak(0);
      doGameOver();
    } else {
      setWrongStreak(next);
      doMiss();
    }
  };

  return (
    <>
      <div className="flex justify-center px-6 py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="dotted-box flex flex-col items-center gap-2 px-4 py-3 text-center"
        >
          <label
            htmlFor="hidden-command-input"
            className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] tracking-[0.2em] text-[var(--color-ink)]/60"
          >
            HIDDEN COMMAND
          </label>
          <input
            id="hidden-command-input"
            type="text"
            value={value}
            maxLength={5}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            onChange={(e) => setValue(e.target.value.toUpperCase().slice(0, 5))}
            aria-describedby="hidden-command-hint"
            className="w-24 text-center border-4 border-[var(--color-ink)] bg-[var(--color-bg)] text-[var(--color-ink)] font-[family-name:var(--font-pixel)] text-sm tracking-[0.3em] py-1"
          />
          <span id="hidden-command-hint" className="sr-only">
            5文字のコマンドを入力してEnterで実行
          </span>
          <div
            aria-live="polite"
            className="min-h-[1.4em] font-[family-name:var(--font-pixel)] text-[10px] text-[var(--color-accent)]"
          >
            {missText && !gameOver && "MISS!"}
            {gameOver && "GAME OVER... (もう1回?)"}
          </div>
        </form>
      </div>

      {raining && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {drops.map((d) => (
            <img
              key={d.id}
              src={CORGI_SRC}
              alt=""
              className={`absolute h-10 w-auto ${reduceMotion ? "" : "corgi-rain-drop"}`}
              style={
                reduceMotion
                  ? { left: `${d.left}%`, top: `${d.top}%`, imageRendering: "pixelated" }
                  : {
                      left: `${d.left}%`,
                      top: 0,
                      imageRendering: "pixelated",
                      animationDelay: `${d.delay}s`,
                      animationDuration: `${d.duration}s`,
                    }
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
