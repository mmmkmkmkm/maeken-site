import { useState } from "react";
import { TypewriterHeading } from "./TypewriterHeading";
import { PixelDecor } from "./PixelDecor";

const stats = [
  { label: "NAME", value: "前田健太朗" },
  { label: "CLASS", value: "Bassist → Composer" },
  { label: "LV", value: "27" },
  { label: "SKILL", value: "作曲・編曲・ベース・Logic Pro" },
];

export function About() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[var(--color-bg-alt)] py-20 md:py-32 px-6 md:px-10 border-t-4 border-[var(--color-ink)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-14 md:mb-20">
          <p className="text-xs tracking-[0.2em] text-[var(--color-accent)] mb-3 font-[family-name:var(--font-pixel)] flex items-center gap-2">
            02
            <PixelDecor kind="flower" color="var(--color-corgi)" className="w-3.5 h-3.5" />
          </p>
          <TypewriterHeading
            id="about-heading"
            text="STATUS"
            className="font-[family-name:var(--font-title)] text-2xl md:text-4xl text-[var(--color-ink)] leading-relaxed"
          />
        </div>

        <div className="grid md:grid-cols-[minmax(0,280px)_1fr] gap-10 md:gap-16 items-start">
          <button
            type="button"
            onMouseEnter={() => setRevealed(true)}
            onMouseLeave={() => setRevealed(false)}
            onFocus={() => setRevealed(true)}
            onBlur={() => setRevealed(false)}
            aria-pressed={revealed}
            aria-label="ホバー、またはクリックで実写に切り替え"
            className="reveal pixel-border block w-full max-w-[280px] mx-auto md:mx-0 aspect-square overflow-hidden bg-[var(--color-bg)] p-0 m-2"
          >
            <img
              src={revealed ? "./assets/顔写真1.jpg" : "./assets/pixel/portrait_pixel.png"}
              alt="前田健太朗のポートレート"
              className="w-full h-full object-cover"
              style={{ imageRendering: revealed ? "auto" : "pixelated" }}
            />
          </button>

          <div className="max-w-[680px]">
            <dl className="reveal grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8 pixel-border bg-[var(--color-bg)] p-5 md:p-6 m-2">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] tracking-[0.2em] text-[var(--color-accent)] mb-1 font-[family-name:var(--font-pixel)]">
                    {s.label}
                  </dt>
                  <dd className="text-sm md:text-base text-[var(--color-ink)]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="reveal relative bg-[var(--color-bg)] border-4 border-[var(--color-ink)] p-5 md:p-7 m-2">
              <p className="text-sm md:text-base leading-relaxed text-[var(--color-ink)] mb-4">
                ベーシストとして培った演奏感覚を軸に、
                <strong className="font-bold">
                  作曲・編曲・トラックメイク
                </strong>
                に取り組む音楽クリエイターです。吹奏楽・軽音・バンドでの活動を経て19歳から楽曲制作を始め、J-POPを中心に制作を続けています。
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--color-ink)]/80 mb-4">
                2025年に白血病を患ったことをきっかけに、音楽へ専念する決意を固めました。闘病を通して込み上げたのは「もっと音楽がやりたい」という一心。回復後に会社を辞め、いま人生をかけて音楽に向き合っています。
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--color-ink)]/80">
                生楽器を取り入れたバンドアレンジから打ち込みまで。ベースの演奏・レコーディング、譜面制作にも対応します。人と意見を交わしながら曲を磨いていく——その姿勢を大切にしています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
