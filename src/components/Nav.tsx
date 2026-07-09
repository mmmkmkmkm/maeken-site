const NAV_LINKS = [
  { href: "#works", label: "WORKS" },
  { href: "#about", label: "ABOUT" },
  { href: "#services", label: "SERVICES" },
  { href: "#contact", label: "CONTACT" },
];

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--color-bg)]/95 border-b-4 border-[var(--color-ink)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-3">
        <a
          href="#hero"
          className="shrink-0 font-[family-name:var(--font-pixel)] text-lg sm:text-xl md:text-2xl tracking-tight text-[var(--color-ink)]"
        >
          MAEKEN
        </a>
        <nav aria-label="メインナビゲーション" className="min-w-0">
          <ul className="flex items-center gap-3 sm:gap-6 md:gap-8 text-[10px] sm:text-xs md:text-sm tracking-[0.05em] text-[var(--color-ink)] font-[family-name:var(--font-pixel)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="dot-menu-item inline-block py-1 hover:text-[var(--color-accent)] transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
