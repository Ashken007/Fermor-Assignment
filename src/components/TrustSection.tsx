"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Lock, Cpu, Landmark, Scale } from "lucide-react";

export default function TrustSection() {
  const TRUST_POINTS = [
    {
      icon: Scale,
      title: "Transparent calculations",
      desc: "Every recommendation shows full mathematical formulas, CAGR rates, tax deductions, and compounding logic. Zero black-box predictions.",
    },
    {
      icon: Cpu,
      title: "Clear methodology",
      desc: "Grounded in historical Indian market performance (Nifty 50 15-Yr CAGR) and realistic CPI inflation adjustments.",
    },
    {
      icon: ShieldCheck,
      title: "Built for Indian financial decisions",
      desc: "Deep integration with Indian tax slabs (New vs Old), Section 80C, ELSS, HRA exemptions, and EPF/NPS rules.",
    },
    {
      icon: Lock,
      title: "Simple, understandable financial tools",
      desc: "Designed for extreme cognitive clarity. Zero financial jargon clutter or pushy marketing sales pitches.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E5E7EB] text-xs font-semibold text-[#059669] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Uncompromising Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-serif mb-4">
            Your money deserves clarity.
          </h2>
          <p className="text-lg text-[#4B5563]">
            We built Fermor on the principle that financial products should earn your trust through open math, clean UI, and complete alignment with your goals.
          </p>
        </div>

        {/* 4 Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_POINTS.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#FAF9F5] border border-[#E5E7EB] rounded-2xl flex flex-col justify-between hover:border-[#059669] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#059669] mb-5 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] font-serif mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {point.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center gap-1.5 text-xs text-[#059669] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
