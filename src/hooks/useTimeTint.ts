import { useEffect, useState } from "react";

export type TimeBand = "morning" | "midday" | "sunset" | "night";

const BAND_COLORS: Record<TimeBand, string> = {
  morning: "#f5f1e6",
  midday: "#f7f4ea",
  sunset: "#f7ece0",
  night: "#efece8",
};

function getBand(hour: number): TimeBand {
  if (hour >= 5 && hour < 10) return "morning";
  if (hour >= 10 && hour < 16) return "midday";
  if (hour >= 16 && hour < 19) return "sunset";
  return "night";
}

/**
 * Reads the local hour and gently tints the shared `--color-bg` CSS
 * variable to match the time of day (subtle — legibility takes priority
 * over mood). Re-checks every minute so a long-open tab drifts bands
 * naturally. Returns the current band so callers can add small time-aware
 * touches (e.g. a sunset dot near the HP bar).
 */
export function useTimeTint(): TimeBand {
  const [band, setBand] = useState<TimeBand>(() => getBand(new Date().getHours()));

  useEffect(() => {
    const update = () => setBand(getBand(new Date().getHours()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-bg", BAND_COLORS[band]);
    return () => {
      document.documentElement.style.removeProperty("--color-bg");
    };
  }, [band]);

  return band;
}
