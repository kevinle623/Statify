import { FooterContent } from "./FooterContent";

interface DesktopFooterProps {
  sidebarWidth: string;
}

export function DesktopFooter({ sidebarWidth }: DesktopFooterProps) {
  return (
    <footer
      className="fixed bottom-0 right-0 h-12 hidden lg:flex justify-between items-center px-12 bg-background border-t border-divider z-40 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      <FooterContent />
    </footer>
  );
}
