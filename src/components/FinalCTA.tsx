"use client";

import React from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

interface FinalCTAProps {
  onGetStarted?: () => void;
  onTryCalculator?: () => void;
}

export default function FinalCTA({ onGetStarted, onTryCalculator }: FinalCTAProps) {
  const handleScrollToMath = () => {
    const el = document.getElementById("math-section");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[#111827] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#059669]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2937] border border-[#374151] text-xs font-semibold text-[#10B981] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Join Young Indian Professionals Planning Their Future
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-serif mb-6 leading-tight">
          Understand your money. <br />
          <span className="text-[#10B981]">Plan with confidence.</span>
        </h2>

        <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Take control of your personal wealth today. Start with a question, calculate your numbers, and plan what comes next.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-lg hover:shadow-green-glow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Get started free
            <ArrowRight className="w-5 h-5 ml-0.5" />
          </button>

          <button
            onClick={onTryCalculator || handleScrollToMath}
            className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-[#D1D5DB] hover:text-white bg-[#1F2937] hover:bg-[#374151] border border-[#374151] rounded-xl transition-all cursor-pointer"
          >
            Try SIP Calculator
          </button>
        </div>

        {/* Audit Item 3 & 7: Clean grounded security & clarity tags */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9CA3AF]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Secure & private
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Free calculation tools
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Transparent math
          </span>
        </div>

      </div>
    </section>
  );
}
