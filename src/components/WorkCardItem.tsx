import { useState } from "react";
import type { WorkCard } from "../data/works";
import { CorgiPlayer } from "./CorgiPlayer";
import { AppleMusicIcon, SpotifyIcon, YoutubeIcon } from "./PixelIcons";

export function WorkCardItem({ card }: { card: WorkCard }) {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <article className="reveal pixel-border group bg-[var(--color-bg)] p-5 md:p-6 m-2 transition-transform duration-150 hover:-translate-y-1">
      {card.isNew && (
        <span
          aria-label="新着"
          className="blink absolute -top-3 -right-3 z-10 text-[9px] tracking-[0.1em] text-[var(--color-bg)] bg-[var(--color-accent)] border-2 border-[var(--color-ink)] px-1.5 py-1 font-[family-name:var(--font-pixel)]"
        >
          NEW!
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-[family-name:var(--font-pixel)] text-base md:text-lg text-[var(--color-ink)]">
            {card.title}
          </h4>
          <p className="mt-1 text-xs md:text-sm text-[var(--color-ink)]/70">
            {card.meta}
          </p>
        </div>
        {card.comingSoon && (
          <span className="shrink-0 text-[9px] tracking-[0.1em] uppercase text-[var(--color-bg)] bg-[var(--color-accent)] px-2 py-1 font-[family-name:var(--font-pixel)]">
            SOON
          </span>
        )}
      </div>

      {card.spotify && (
        <div className="mt-4">
          {showEmbed ? (
            <div className="pixel-border bg-[var(--color-bg-alt)] p-2 m-2">
              <iframe
                title={`${card.title} — Spotify player`}
                src={`https://open.spotify.com/embed/${card.spotify.kind}/${card.spotify.id}`}
                width="100%"
                height="152"
                style={{ border: 0 }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowEmbed(true)}
                className="pixel-btn text-[11px] md:text-xs"
                aria-expanded={showEmbed}
              >
                <SpotifyIcon className="w-4 h-4 shrink-0" />
                <span aria-hidden="true">▶</span> PLAY
              </button>
              {card.youtubeId && (
                <a
                  href={`https://youtu.be/${card.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${card.title} をYouTubeで開く`}
                  className="inline-flex items-center justify-center w-9 h-9 border-4 border-[var(--color-ink)] text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
              {card.appleMusic && (
                <a
                  href={card.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${card.title} をApple Musicで開く`}
                  className="inline-flex items-center justify-center w-9 h-9 border-4 border-[var(--color-ink)] text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                >
                  <AppleMusicIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {card.audioSrc && <CorgiPlayer src={card.audioSrc} />}
    </article>
  );
}
