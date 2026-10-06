"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import AskFermor from "@/components/AskFermor";
import SIPCalculator from "@/components/SIPCalculator";
import FinancialOverview from "@/components/FinancialOverview";
import FutureProjection from "@/components/FutureProjection";
import ActionCards from "@/components/ActionCards";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: "login" | "signup";
  }>({
    isOpen: false,
    mode: "signup",
  });

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthModalState({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AuthProvider>
      <main className="min-h-screen bg-[#FAF9F5] text-[#111827] flex flex-col font-sans selection:bg-[#ECFDF5] selection:text-[#047857]">
        {/* 1. Navbar */}
        <Navbar onOpenAuth={handleOpenAuth} />

      {/* 2. Hero Section (includes Financial Snapshot) */}
      <Hero
        onExploreClick={() => handleOpenAuth("signup")}
        onSeeHowItWorksClick={() => {
          const calculateEl = document.getElementById("calculate");
          if (calculateEl) {
            const yOffset = -80;
            const y = calculateEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
      />

      {/* 3. Problem Section */}
      <ProblemSection />

      {/* 4. Ask Fermor Section */}
      <AskFermor />

      {/* 5. See The Math Section (SIP Calculator) */}
      <SIPCalculator />

      {/* 6. Financial Overview Section */}
      <FinancialOverview />

      {/* 7. Future Projection Section */}
      <FutureProjection />

      {/* 8. Act Section */}
      <ActionCards />

      {/* 9. Trust Section */}
      <TrustSection />

      {/* 10. Final CTA */}
      <FinalCTA
        onGetStarted={() => handleOpenAuth("signup")}
        onTryCalculator={() => {
          const calculateEl = document.getElementById("calculate");
          if (calculateEl) {
            const yOffset = -80;
            const y = calculateEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
      />

      {/* 11. Footer */}
      <Footer />

      {/* Interactive Auth Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={handleCloseAuth}
      />
    </main>
    </AuthProvider>
  );
}
