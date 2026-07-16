type StopFn = () => void;

let activeStop: StopFn | null = null;

/** Claims the single shared "now playing" slot. If something else (BGM or
 * another track) currently holds it, that source is stopped first — only
 * one audio source plays at a time across the site. */
export function claimAudio(stop: StopFn) {
  if (activeStop && activeStop !== stop) {
    activeStop();
  }
  activeStop = stop;
}
