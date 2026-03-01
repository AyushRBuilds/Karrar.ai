'use client'

import { LandingNavbar } from '@/components/landing/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { AgentsSection } from '@/components/landing/AgentsSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <main className="bg-[#f5f0e8]">
      <LandingNavbar />
      <HeroSection />
      <HowItWorksSection />
      <AgentsSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
