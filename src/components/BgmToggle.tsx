import { toggleBgm, useBgmPlaying } from "../hooks/useBgm";

/**
 * Fixed bottom-right BGM switch. Browsers block autoplay, so this is the
 * explicit opt-in; it also blinks (gently, and not under reduced-motion) to
 * draw the eye without being obnoxious.
 */
export function BgmToggle() {
  const playing = useBgmPlaying();

  return (
    <button
      type="button"
      onClick={toggleBgm}
      aria-pressed={playing}
      aria-label={playing ? "BGMを停止" : "BGMを再生"}
      className={`pixel-btn fixed bottom-3 right-3 z-40 text-[9px] sm:text-[10px] ${playing ? "" : "blink"}`}
    >
      ♪ BGM: {playing ? "ON" : "OFF"}
    </button>
  );
}
