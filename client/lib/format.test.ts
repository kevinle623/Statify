import { describe, expect, it } from "vitest";
import { formatDuration } from "@/client/lib/format";

describe("formatDuration", () => {
  it("formats sub-minute values with zero-padded seconds", () => {
    expect(formatDuration(9_000)).toBe("0:09");
  });

  it("formats whole minutes correctly", () => {
    expect(formatDuration(180_000)).toBe("3:00");
  });

  it("formats mixed minute and second values", () => {
    expect(formatDuration(245_000)).toBe("4:05");
  });
});
