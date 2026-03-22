import { describe, expect, it } from "vitest";
import { formatDuration } from "@/client/lib/format";

describe("formatDuration", () => {
  it("formats zero milliseconds", () => {
    expect(formatDuration(0)).toBe("0:00");
  });

  it("formats sub-minute values with zero-padded seconds", () => {
    expect(formatDuration(9_000)).toBe("0:09");
  });

  it("formats whole minutes correctly", () => {
    expect(formatDuration(180_000)).toBe("3:00");
  });

  it("formats mixed minute and second values", () => {
    expect(formatDuration(245_000)).toBe("4:05");
  });

  it("formats a typical track duration (3:35)", () => {
    expect(formatDuration(215_000)).toBe("3:35");
  });

  it("formats long durations (10+ minutes)", () => {
    expect(formatDuration(600_000)).toBe("10:00");
  });

  it("truncates partial seconds (floors, does not round)", () => {
    expect(formatDuration(61_999)).toBe("1:01");
  });
});
