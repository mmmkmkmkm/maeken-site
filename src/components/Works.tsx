import { workGroups } from "../data/works";
import { WorkCardItem } from "./WorkCardItem";
import { TypewriterHeading } from "./TypewriterHeading";
import { PixelDecor } from "./PixelDecor";

export function Works() {
  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="bg-[var(--color-bg)] py-20 md:py-32 px-6 md:px-10 border-t-4 border-[var(--color-ink)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-14 md:mb-20">
          <p className="text-xs tracking-[0.2em] text-[var(--color-accent)] mb-3 font-[family-name:var(--font-pixel)] flex items-center gap-2">
            01
            <PixelDecor kind="note" color="var(--color-corgi)" className="w-3.5 h-3.5" />
          </p>
          <TypewriterHeading
            id="works-heading"
            text="SELECT TRACK"
            className="font-[family-name:var(--font-title)] text-2xl md:text-4xl text-[var(--color-ink)] leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {workGroups.map((group) => (
            <div key={group.key}>
              <h3 className="reveal flex flex-wrap items-baseline gap-3 mb-6 md:mb-8">
                <span className="bg-[var(--color-ink)] text-[var(--color-bg)] font-[family-name:var(--font-pixel)] text-xs md:text-sm tracking-[0.1em] px-3 py-1.5">
                  {group.num}
                </span>
                <span className="font-[family-name:var(--font-body)] text-xl md:text-2xl text-[var(--color-ink)]">
                  {group.jaLabel}
                </span>
                <span className="text-xs md:text-sm tracking-[0.1em] text-[var(--color-ink)]/60">
                  {group.enLabel}
                </span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {group.cards.map((card) => (
                  <WorkCardItem key={card.id} card={card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
