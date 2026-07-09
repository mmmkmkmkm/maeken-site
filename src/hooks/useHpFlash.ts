import { useSyncExternalStore } from "react";

let active = false;
let timer: number | undefined;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

/** Flashes the HP bar to empty for a beat — used by the hidden-command
 * penalty in HiddenCommand.tsx. */
export function triggerHpMiss() {
  active = true;
  notify();
  if (timer) window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    active = false;
    notify();
  }, 700);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return active;
}

function getServerSnapshot() {
  return false;
}

export function useHpMissActive(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
