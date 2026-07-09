import { useEffect } from "react";

/**
 * Observes all elements with the `.reveal` class inside `root` (defaults to
 * document) and adds `.is-in` when they scroll into view. Cards that share a
 * parent get a staggered delay (capped at 400ms) based on their index among
 * siblings.
 *
 * Respects prefers-reduced-motion: reduce by revealing everything instantly.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"),
    );

    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }

    // Stagger siblings that share a parent, capped at 400ms total.
    const groups = new Map<Element | null, HTMLElement[]>();
    elements.forEach((el) => {
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent)!.push(el);
    });

    groups.forEach((siblings) => {
      const count = siblings.length;
      const maxStagger = 400;
      const step = count > 1 ? Math.min(maxStagger / (count - 1), 120) : 0;
      siblings.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * step, maxStagger)}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
