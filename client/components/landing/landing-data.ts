import { Clock, TrendingUp, User } from "lucide-react";

export const features = [
  {
    icon: TrendingUp,
    title: "Real-time Stats",
    description:
      "Live monitoring of your current stream. Every second processed, every decibel archived as it happens.",
    module: "Module 01 // Live",
  },
  {
    icon: User,
    title: "Artist Insights",
    description:
      "Deep-core analysis of your favorite curators. Discover hidden patterns in genre affinity and release cycle loyalty.",
    module: "Module 02 // Analytics",
  },
  {
    icon: Clock,
    title: "Historical Trends",
    description:
      "Your entire listening history, reconstructed. From your first stream to your latest obsession, a high-fidelity timeline of your sonic evolution.",
    module: "Module 03 // Archive",
  },
];

export const steps = [
  {
    number: "01",
    title: "Authorization",
    description:
      "Log in with your Spotify account securely. We never see or store your password.",
  },
  {
    number: "02",
    title: "Ingestion",
    description:
      "Massive-scale data fetching of your play history, saved tracks, and custom playlists.",
  },
  {
    number: "03",
    title: "Visualization",
    description:
      "Rendering of complex data clusters into a readable, editorial-grade interface.",
  },
];

export const faqs = [
  {
    id: "security",
    question: "Is my Spotify account secure?",
    answer:
      "Statify only requests 'Read' permissions. We never have access to your password or payment details. Your data is your own.",
  },
  {
    id: "refresh",
    question: "How often does the data refresh?",
    answer:
      "Statify pulls real-time data from the Spotify API. Your dashboard reflects your listening habits with minimal latency.",
  },
  {
    id: "export",
    question: "Can I export my archival data?",
    answer:
      "Export functionality is coming soon. You'll be able to export your historical data as structured files for external analysis.",
  },
];
