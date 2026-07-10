import { TypewriterHeading } from "./TypewriterHeading";
import { PixelDecor } from "./PixelDecor";

type Service = {
  num: string;
  title: string;
  desc: string;
  subject: string;
  cta: string;
};

const services: Service[] = [
  {
    num: "01",
    title: "作曲・編曲 / COMPOSE・ARRANGE",
    desc: "ホーンセクションや生楽器を取り入れたバンドアレンジから、打ち込み系トラックまで。デモ・ラフからの立ち上げにも対応します。J-POPを中心に、楽曲の芯となるラインづくりが得意です。",
    subject: "作曲・編曲のご依頼",
    cta: "依頼する",
  },
  {
    num: "02",
    title: "ベース録音 / RECORDING SUPPORT",
    desc: "生ベースのレコーディングを承ります。Atelier Z Beta5/32 と Antelope Zen Go による自宅録音環境で、指弾き・ピック・スラップに対応。",
    subject: "ベース録音のご依頼",
    cta: "依頼する",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[var(--color-bg)] py-20 md:py-32 px-6 md:px-10 border-t-4 border-[var(--color-ink)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-14 md:mb-20">
          <p className="text-xs tracking-[0.2em] text-[var(--color-accent)] mb-3 font-[family-name:var(--font-pixel)] flex items-center gap-2">
            04
            <PixelDecor kind="star" color="var(--color-corgi)" className="w-3.5 h-3.5" />
          </p>
          <TypewriterHeading
            id="services-heading"
            text="ITEM SHOP"
            className="font-[family-name:var(--font-title)] text-2xl md:text-4xl text-[var(--color-ink)] leading-relaxed"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[900px]">
          {services.map((s) => (
            <article
              key={s.num}
              className="group reveal pixel-border flex flex-col p-6 md:p-8 m-2 bg-[var(--color-bg)] transition-colors duration-150 hover:bg-[var(--color-accent)]"
            >
              <p className="text-xs tracking-[0.15em] mb-4 font-[family-name:var(--font-pixel)] text-[var(--color-ink)]/60 transition-colors duration-150 group-hover:text-[var(--color-bg)]">
                ITEM {s.num}
              </p>
              <h3 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl mb-1 text-[var(--color-ink)] transition-colors duration-150 group-hover:text-[var(--color-bg)]">
                {s.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed flex-1 mb-6 text-[var(--color-ink)]/80 transition-colors duration-150 group-hover:text-[var(--color-bg)]/90">
                {s.desc}
              </p>
              <a
                href={`mailto:sounandesuyo21@gmail.com?subject=${encodeURIComponent(s.subject)}`}
                className="pixel-btn text-xs md:text-sm w-fit"
              >
                ▶ {s.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
