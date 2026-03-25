import { FooterContent } from "@/client/components/app-shell/FooterContent";

export function LandingFooter() {
  return (
    <footer className="w-full py-8 border-t border-divider bg-background px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <FooterContent />
    </footer>
  );
}
