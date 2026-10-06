"use client";

import React from "react";
import { ArrowRight, Play, CheckCircle2, Shield, TrendingUp, Sparkles } from "lucide-react";
import FinancialSnapshot from "./FinancialSnapshot";

interface HeroProps {
  onExploreClick?: () => void;
  onSeeHowItWorksClick?: () => void;
}

export default function Hero({ onExploreClick, onSeeHowItWorksClick }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FAF9F5]">
      {/* Subtle grid background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-[#111827] 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-xs mb-6 text-xs font-semibold text-[#374151]">
              <span className="flex h-2 w-2 rounded-full bg-[#059669]"></span>
              Modern Indian Personal Finance & Investing
              <span className="text-[#059669] font-bold">₹</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] leading-[1.1] font-serif mb-6">
              Make smarter <br className="hidden sm:inline" />
              <span className="text-[#111827] relative">
                money decisions.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#059669]/30 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed mb-8 font-sans">
              Understand your money, see the numbers, and plan what comes next.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreClick || (() => handleScrollTo("ask"))}
                className="px-7 py-3.5 text-base font-semibold text-white bg-[#111827] hover:bg-[#059669] rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Explore Fermor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onSeeHowItWorksClick || (() => handleScrollTo("calculate"))}
                className="px-6 py-3.5 text-base font-semibold text-[#374151] hover:text-[#111827] bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#059669] group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                See how it works
              </button>
            </div>

            {/* Key Value Props / Core Philosophy */}
            <div className="pt-6 border-t border-[#E5E7EB] w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 text-left">
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-wider text-[#059669]">01. Understand</span>
                <span className="text-xs text-[#6B7280] mt-0.5 font-medium">Clarity on expenses & savings</span>
              </div>
              <div className="flex flex-col pt-3 sm:pt-0 border-t sm:border-t-0 border-l-0 sm:border-l border-[#E5E7EB] sm:pl-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#059669]">02. Plan</span>
                <span className="text-xs text-[#6B7280] mt-0.5 font-medium">Data-backed SIP & wealth goals</span>
              </div>
              <div className="flex flex-col pt-3 sm:pt-0 border-t sm:border-t-0 border-l-0 sm:border-l border-[#E5E7EB] sm:pl-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#059669]">03. Act</span>
                <span className="text-xs text-[#6B7280] mt-0.5 font-medium">Confident execution for growth</span>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Financial Snapshot Product UI */}
          <div id="financial-snapshot" className="lg:col-span-5 w-full">
            <FinancialSnapshot />
          </div>

        </div>
      </div>
    </section>
  );
}
