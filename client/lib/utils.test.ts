import { describe, expect, it } from "vitest";
import { cn } from "@/client/lib/utils";

describe("cn", () => {
  it("merges tailwind utility conflicts", () => {
    expect(cn("px-2 text-white", "px-4")).toBe("text-white px-4");
  });

  it("ignores falsey values", () => {
    expect(cn("rounded-xl", undefined, false && "hidden", null, "shadow")).toBe(
      "rounded-xl shadow",
    );
  });
});
