import { TypewriterHeading } from "./TypewriterHeading";

const links = [
  { label: "Instagram", href: "https://www.instagram.com/maeda_kentarooh" },
  { label: "YouTube", href: "https://youtube.com/@maeken5747" },
  { label: "lnkpie", href: "https://lnkpie.com/@maeken" },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[var(--color-dark)] py-24 md:py-36 px-6 md:px-10 border-t-4 border-[var(--color-ink)] text-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1400px] text-center">
        <p className="reveal text-xs tracking-[0.2em] text-[var(--color-accent)] mb-6 font-[family-name:var(--font-pixel)]">
          05
        </p>
        <TypewriterHeading
          id="contact-heading"
          text="CONTINUE?"
          className="reveal font-[family-name:var(--font-title)] text-3xl md:text-6xl text-[var(--color-bg)] mb-10 leading-relaxed"
        />

        <p className="reveal text-sm md:text-base text-[var(--color-bg)]/70 mb-10 font-[family-name:var(--font-pixel)]">
          制作・演奏のご依頼、お問い合わせはこちらから。
        </p>

        <div className="reveal flex flex-col items-center gap-5 mb-14">
          <a
            href="mailto:sounandesuyo21@gmail.com"
            className="pixel-btn bg-[var(--color-bg)] text-[var(--color-ink)] text-sm md:text-lg break-all"
          >
            ▶ YES (メール)
          </a>
        </div>

        <ul className="reveal flex items-center justify-center gap-6 md:gap-10 text-sm tracking-[0.08em] font-[family-name:var(--font-pixel)]">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-bg)] hover:text-[var(--color-accent)] transition-colors"
              >
                ▶ {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
