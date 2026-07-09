import { useSyncExternalStore } from "react";

/**
 * Single shared, rAF-throttled scroll listener. Every consumer subscribes to
 * the same store instead of attaching its own `scroll` handler, so N
 * components reading scroll position only cost one listener + one rAF tick.
 */
type ScrollState = {
  scrollY: number;
  /** 0..1 progress across the whole document (0 = top, 1 = bottom). */
  progress: number;
  direction: "up" | "down";
};

const initialState: ScrollState = { scrollY: 0, progress: 0, direction: "down" };

let state: ScrollState = initialState;
let lastY = 0;
let ticking = false;
let initialized = false;
const listeners = new Set<() => void>();

function computeState() {
  const doc = document.documentElement;
  const scrollY = window.scrollY || doc.scrollTop || 0;
  const scrollable = doc.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;
  const direction: ScrollState["direction"] =
    scrollY > lastY ? "down" : scrollY < lastY ? "up" : state.direction;
  lastY = scrollY;
  state = { scrollY, progress, direction };
  listeners.forEach((listener) => listener());
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    computeState();
    ticking = false;
  });
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  lastY = window.scrollY || 0;
  computeState();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

function subscribe(listener: () => void) {
  init();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return initialState;
}

export function useScrollProgress(): ScrollState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Quantizes t (0..1) into `steps` discrete buckets — the JS analogue of
 * CSS `steps()` easing, for values driven by scroll position rather than
 * elapsed time. */
export function quantize(t: number, steps: number) {
  const clamped = Math.min(1, Math.max(0, t));
  if (steps <= 0) return clamped;
  return Math.floor(clamped * steps) / steps;
}
