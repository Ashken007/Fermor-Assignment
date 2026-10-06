"use client";

import React, { useState } from "react";
import { HelpCircle, ArrowRight, CheckCircle2, ChevronRight, ShieldAlert, Sparkles, Sliders } from "lucide-react";
import { formatINR } from "@/utils/formatters";

interface QuestionCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
  verdict: string;
  verdictText: string;
  formula: string;
}

const QUESTIONS: QuestionCard[] = [
  {
    id: "affordability",
    title: "Can I afford it?",
    subtitle: "Evaluate large purchases like a car, luxury trip, or home upgrade without compromising security.",
    badge: "Affordability Trade-Off",
    metrics: [
      { label: "Purchase cost", value: "₹4,50,000", sub: "Down-payment / One-time" },
      { label: "Emergency buffer left", value: "6.2 Months", sub: "Threshold > 6 mos" },
      { label: "Monthly SIP impact", value: "-₹3,500/mo", sub: "Adjusted investment" },
    ],
    verdict: "Illustrative result: Sustainable",
    verdictText: "Based on example inputs: You maintain a 6+ month emergency cushion while funding this purchase via a 24-month planned savings bucket.",
    formula: "Safety Index = (Liquid Savings - Down Payment) / Monthly Fixed Expenses",
  },
  {
    id: "investment",
    title: "How much should I invest?",
    subtitle: "Find the optimal balance between enjoying today and compounding wealth for tomorrow.",
    badge: "50-30-20 Rule Analysis",
    metrics: [
      { label: "Monthly income", value: "₹1,20,000", sub: "Take-home pay" },
      { label: "Essentials (50%)", value: "₹60,000", sub: "Rent, bills, food" },
      { label: "Recommended SIP (30%)", value: "₹36,000", sub: "Equity & Index funds" },
    ],
    verdict: "Illustrative result: ₹36,000/mo Target",
    verdictText: "Based on example inputs: Allocating 30% of take-home pay creates an optimal balance between present lifestyle and compound growth.",
    formula: "Target SIP = Net Income × 0.30 (Adjusted for Debt obligations)",
  },
  {
    id: "on-track",
    title: "Am I on track?",
    subtitle: "Measure your current portfolio trajectory against your targeted financial goal timeline.",
    badge: "Goal Trajectory Index",
    metrics: [
      { label: "Target goal", value: "₹1.00 Crore", sub: "In 12 Years" },
      { label: "Current corpus", value: "₹18,50,000", sub: "Mutual funds & EPF" },
      { label: "Current monthly SIP", value: "₹28,000", sub: "12% CAGR expected" },
    ],
    verdict: "Illustrative projection: On Schedule",
    verdictText: "Based on example inputs: Increasing your monthly SIP by ₹4,500 annually aligns your timeline to reach ₹1 Crore within 11.5 years.",
    formula: "Goal Gap = Target Corpus - Compounded Present Value (12% CAGR)",
  },
];

export default function ProblemSection() {
  const [activeId, setActiveId] = useState<string>("affordability");

  const activeCard = QUESTIONS.find((q) => q.id === activeId) || QUESTIONS[0];

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E5E7EB] text-xs font-semibold text-[#059669] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Clear Decision Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-serif mb-4">
            Money decisions shouldn&apos;t feel complicated.
          </h2>
          <p className="text-lg text-[#4B5563]">
            Young Indian professionals earn money every day, but often wonder if they are making the smartest choices. Fermor translates uncertainty into clear trade-off mathematics.
          </p>
        </div>

        {/* 3 Question Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {QUESTIONS.map((q) => {
            const isActive = q.id === activeId;
            return (
              <div
                key={q.id}
                onClick={() => setActiveId(q.id)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-[#FAF9F5] border-[#059669] shadow-md ring-1 ring-[#059669]"
                    : "bg-white border-[#E5E7EB] hover:border-[#9CA3AF] hover:shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      isActive
                        ? "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]"
                        : "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]"
                    }`}>
                      {q.badge}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">Illustrative</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] font-serif mb-2">
                    {q.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                    {q.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold">
                  <span className={isActive ? "text-[#059669]" : "text-[#4B5563]"}>
                    {isActive ? "Viewing Calculation" : "Inspect Example"}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-[#059669] translate-x-1" : "text-[#9CA3AF]"}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Trade-Off Calculation Drawer */}
        <div className="bg-[#FAF9F5] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                Illustrative Calculation Model
              </span>
              <h3 className="text-2xl font-bold text-[#111827] font-serif mt-2">
                Scenario: &quot;{activeCard.title}&quot;
              </h3>
            </div>

            <div className="text-xs text-[#6B7280] bg-white px-3 py-1.5 rounded-lg border border-[#E5E7EB] font-mono break-all sm:break-normal min-w-0">
              {activeCard.formula}
            </div>
          </div>

          {/* Metrics breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {activeCard.metrics.map((m, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#E5E7EB]">
                <div className="text-xs font-medium text-[#6B7280]">{m.label}</div>
                <div className="text-xl font-bold text-[#111827] mt-1">{m.value}</div>
                <div className="text-[11px] text-[#059669] font-medium mt-0.5">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Verdict banner */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-[#111827]">
                {activeCard.verdict}
              </div>
              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                {activeCard.verdictText}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
