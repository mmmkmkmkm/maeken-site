import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

function formatTime(sec: number) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function CorgiPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = (ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const clamped = Math.min(1, Math.max(0, ratio));
    audio.currentTime = clamped * duration;
    setCurrent(audio.currentTime);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = progressRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    seekTo((e.clientX - rect.left) / rect.width);
  };

  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      audio.currentTime = Math.min(duration, audio.currentTime + 5);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    }
  };

  const progressPct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="mt-4 pixel-border bg-[var(--color-corgi)] p-3 m-2">
      <audio ref={audioRef} src={src} preload="metadata" />
      <p className="text-[9px] tracking-[0.2em] text-[var(--color-bg)] font-[family-name:var(--font-pixel)] mb-2 flex items-center justify-between gap-2 flex-wrap">
        <span>CORGI CARTRIDGE</span>
        <span className="text-[var(--color-ink)] bg-[var(--color-bg)] px-1.5 py-0.5">
          PREVIEW (〜1:08)
        </span>
      </p>
      <div className="bg-[var(--color-bg)] border-4 border-[var(--color-ink)] px-3 py-2.5 flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "一時停止" : "再生"}
          className="shrink-0 w-9 h-9 border-4 border-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors"
        >
          {isPlaying ? (
            <Pause size={14} strokeWidth={1.75} />
          ) : (
            <Play size={14} strokeWidth={1.75} className="ml-0.5" />
          )}
        </button>

        <div
          ref={progressRef}
          role="slider"
          tabIndex={0}
          aria-label="再生位置"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPct)}
          onClick={handleProgressClick}
          onKeyDown={handleProgressKeyDown}
          className="relative flex-1 h-3 bg-[var(--color-bg-alt)] border-2 border-[var(--color-ink)] cursor-pointer"
        >
          <div
            className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <span className="shrink-0 text-[10px] tabular-nums text-[var(--color-ink)] font-[family-name:var(--font-pixel)] w-16 text-right">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
