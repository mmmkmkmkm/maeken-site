import { useSyncExternalStore } from "react";
import { claimAudio } from "./useAudioManager";

const AUDIO_SRC = "./assets/audio/Corgi.mp3";

let audio: HTMLAudioElement | null = null;
let playing = false;
const listeners = new Set<() => void>();

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.5;
  }
  return audio;
}

function notify() {
  listeners.forEach((listener) => listener());
}

/** Starts the BGM loop. Safe to call from any first-interaction handler —
 * if the browser blocks autoplay, `playing` just stays false. */
export function playBgm() {
  const a = getAudio();
  if (!a) return;
  claimAudio(pauseBgm);
  a.play()
    .then(() => {
      playing = true;
      notify();
    })
    .catch(() => {
      // Autoplay blocked (no user gesture yet) — leave state as paused.
    });
}

export function pauseBgm() {
  const a = getAudio();
  if (!a) return;
  a.pause();
  playing = false;
  notify();
}

export function toggleBgm() {
  if (playing) pauseBgm();
  else playBgm();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return playing;
}

function getServerSnapshot() {
  return false;
}

/** Shared BGM playing state — every subscriber reflects the same singleton
 * `<audio>` element instead of each component managing its own. */
export function useBgmPlaying(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
