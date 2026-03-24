import { cn } from "@/client/lib/utils";
import type { SpotifyTimeRange } from "@/types/spotify";

const timeRanges: SpotifyTimeRange[] = [
  "short_term",
  "medium_term",
  "long_term",
];

const TIME_RANGE_SHORT_LABELS: Record<SpotifyTimeRange, string> = {
  short_term: "4 Weeks",
  medium_term: "6 Months",
  long_term: "All Time",
};

export function TimeRangePicker({
  timeRange,
  onTimeRangeChange,
}: {
  timeRange: SpotifyTimeRange;
  onTimeRangeChange: (range: SpotifyTimeRange) => void;
}) {
  return (
    <div className="flex bg-surface-container-low p-1 ghost-border">
      {timeRanges.map((range) => (
        <button
          key={range}
          className={cn(
            "px-4 lg:px-6 py-2 text-[10px] font-label tracking-widest uppercase transition-all",
            timeRange === range
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:text-on-surface",
          )}
          onClick={() => onTimeRangeChange(range)}
        >
          {TIME_RANGE_SHORT_LABELS[range]}
        </button>
      ))}
    </div>
  );
}
