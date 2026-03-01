import { describe, expect, it } from "vitest";
import { SPOTIFY_TIME_RANGE_LABELS } from "@/client/lib/spotify";

describe("SPOTIFY_TIME_RANGE_LABELS", () => {
  it("exposes the expected short-term label", () => {
    expect(SPOTIFY_TIME_RANGE_LABELS.short_term).toBe("Last 4 weeks");
  });

  it("exposes the expected medium-term label", () => {
    expect(SPOTIFY_TIME_RANGE_LABELS.medium_term).toBe("Last 6 months");
  });

  it("exposes the expected long-term label", () => {
    expect(SPOTIFY_TIME_RANGE_LABELS.long_term).toBe("Last year");
  });
});
