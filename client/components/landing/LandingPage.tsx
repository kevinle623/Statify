import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { MobileNav } from "@/client/components/landing/MobileNav";
import { LandingNav } from "@/client/components/landing/LandingNav";
import { LandingLogo } from "@/client/components/landing/LandingLogo";
import { HeroSection } from "@/client/components/landing/HeroSection";
import { FeaturesSection } from "@/client/components/landing/FeaturesSection";
import { ProcessSection } from "@/client/components/landing/ProcessSection";
import { PricingSection } from "@/client/components/landing/PricingSection";
import { FaqSection } from "@/client/components/landing/FaqSection";
import { CtaSection } from "@/client/components/landing/CtaSection";
import { LandingFooter } from "@/client/components/landing/LandingFooter";

export function LandingPage({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="bg-surface-container-lowest text-on-surface font-body">
      {/* Top Navigation */}
      <header className="fixed top-0 right-0 left-0 flex items-center px-6 lg:px-16 z-40 bg-background/80 backdrop-blur-md w-full h-16 border-b border-divider">
        <LandingLogo />
        <div className="absolute left-1/2 -translate-x-1/2">
          <LandingNav />
        </div>
        <div className="ml-auto flex items-center gap-6">
          <ThemeToggle />
          <MobileNav />
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection isAuthenticated={isAuthenticated} />

        {/* Features Bento Grid */}
        <FeaturesSection />

        {/* How It Works */}
        <ProcessSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FaqSection />

        {/* Final CTA */}
        <CtaSection isAuthenticated={isAuthenticated} />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
