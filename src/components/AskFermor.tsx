"use client";

import React, { useState } from "react";
import { MessageSquare, ArrowRight, Sparkles, User, Bot, Check, CornerDownLeft, Info } from "lucide-react";
import { formatINR } from "@/utils/formatters";

interface PresetPrompt {
  id: string;
  question: string;
  intro: string;
  income: number;
  essentialExpenses: number;
  availableForGoals: number;
  suggestedInvestmentMin: number;
  suggestedInvestmentMax: number;
  reasoning: string;
}

const PRESETS: PresetPrompt[] = [
  {
    id: "p1",
    question: "I earn ₹20,000 a month. How much should I invest?",
    intro: "Based on the example inputs, here's a possible starting point.",
    income: 20000,
    essentialExpenses: 8000,
    availableForGoals: 12000,
    suggestedInvestmentMin: 4000,
    suggestedInvestmentMax: 6000,
    reasoning: "Allocating 40% (₹8,000) for essential expenses leaves ₹12,000. Investing ₹4K–₹6K (20–30%) in low-cost index SIPs while maintaining a liquid emergency buffer provides steady long-term growth.",
  },
  {
    id: "p2",
    question: "I earn ₹50,000 a month. How much should I save for my emergency fund?",
    intro: "Based on the example inputs, here's a possible starting point.",
    income: 50000,
    essentialExpenses: 22000,
    availableForGoals: 28000,
    suggestedInvestmentMin: 10000,
    suggestedInvestmentMax: 15000,
    reasoning: "Targeting 6 months of essential expenses (₹1.32 Lakhs) in liquid savings before expanding equity allocation.",
  },
  {
    id: "p3",
    question: "I earn ₹80,000 a month. How much should I invest?",
    intro: "Based on the example inputs, here's a possible starting point.",
    income: 80000,
    essentialExpenses: 32000,
    availableForGoals: 48000,
    suggestedInvestmentMin: 16000,
    suggestedInvestmentMax: 24000,
    reasoning: "Investing ₹16K–₹24K monthly (20–30% of salary) compounds into significant wealth over a 10-year horizon.",
  },
];

export default function AskFermor() {
  const [selectedPreset, setSelectedPreset] = useState<PresetPrompt>(PRESETS[0]);
  const [customInput, setCustomInput] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showCalculationModal, setShowCalculationModal] = useState(false);

  // Handle preset click
  const handleSelectPreset = (preset: PresetPrompt) => {
    setIsCalculating(true);
    setSelectedPreset(preset);
    setTimeout(() => setIsCalculating(false), 200);
  };

  // Handle custom prompt input
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsCalculating(true);
    const match = customInput.replace(/,/g, "").match(/\d+/);
    const parsedIncome = match ? parseInt(match[0], 10) : 30000;
    
    const validIncome = Math.max(10000, Math.min(parsedIncome, 1000000));
    const essentials = Math.round(validIncome * 0.4);
    const available = validIncome - essentials;
    const invMin = Math.round(validIncome * 0.2);
    const invMax = Math.round(validIncome * 0.3);

    const customPreset: PresetPrompt = {
      id: `custom-${Date.now()}`,
      question: customInput,
      intro: "Based on the example inputs, here's a possible starting point.",
      income: validIncome,
      essentialExpenses: essentials,
      availableForGoals: available,
      suggestedInvestmentMin: invMin,
      suggestedInvestmentMax: invMax,
      reasoning: `For an example monthly income of ${formatINR(validIncome)}, essential expenses average ${formatINR(essentials)} (40%), leaving ${formatINR(available)} available for goals and liquid reserves.`,
    };

    setSelectedPreset(customPreset);
    setCustomInput("");
    setTimeout(() => setIsCalculating(false), 200);
  };

  return (
    <section id="ask" className="py-20 bg-[#FAF9F5] border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#059669] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Conversational Scenario Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-serif mb-4">
            Start with a question.
          </h2>
          <p className="text-lg text-[#4B5563]">
            Ask any question about salary, savings, or investment options. Fermor translates your scenario into clear numbers.
          </p>
        </div>

        {/* Preset Prompt Selector Chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8 max-w-4xl mx-auto w-full px-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer border text-left break-words focus:outline-hidden focus:ring-2 focus:ring-[#059669] ${
                selectedPreset.id === preset.id
                  ? "bg-[#111827] text-white border-[#111827] shadow-xs"
                  : "bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#9CA3AF] hover:text-[#111827]"
              }`}
            >
              &quot;{preset.question}&quot;
            </button>
          ))}
        </div>

        {/* Chat / Response Container UI */}
        <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl shadow-lg overflow-hidden w-full min-w-0">
          
          {/* Chat Window Header */}
          <div className="bg-[#FAF9F5] px-4 sm:px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#059669] flex items-center justify-center text-white font-bold text-xs shrink-0">
                F
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-bold text-[#111827] block truncate">Fermor Assistant</span>
                <span className="text-[11px] sm:text-xs text-[#6B7280] hidden sm:inline">Interactive Calculation Engine</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#059669] font-medium bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
              Illustrative Demo
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-6 min-w-0">
            
            {/* User Message Bubble */}
            <div className="flex items-start gap-2.5 sm:gap-3 justify-end">
              <div className="bg-[#111827] text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-xs max-w-[85%] sm:max-w-xl text-xs sm:text-base leading-relaxed break-words">
                &quot;{selectedPreset.question}&quot;
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            </div>

            {/* Fermor Response Bubble */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>

              <div className="flex-1 bg-[#FAF9F5] border border-[#E5E7EB] rounded-2xl rounded-tl-xs p-5 sm:p-6">
                
                {isCalculating ? (
                  <div className="py-8 flex items-center justify-center gap-2 text-sm text-[#059669] font-medium">
                    <div className="w-4 h-4 border-2 border-[#059669] border-t-transparent rounded-full animate-spin"></div>
                    Calculating illustrative scenario...
                  </div>
                ) : (
                  <div>
                    {/* Audit Item 8: Intro copy replacement */}
                    <div className="text-sm font-medium text-[#111827] mb-4">
                      &quot;{selectedPreset.intro}&quot;
                    </div>

                    {/* Breakdown Card Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      <div className="bg-white p-3 rounded-xl border border-[#E5E7EB]">
                        <div className="text-xs text-[#6B7280]">Income</div>
                        <div className="text-base font-bold text-[#111827] mt-0.5">
                          {formatINR(selectedPreset.income)}
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#E5E7EB]">
                        <div className="text-xs text-[#6B7280]">Essential expenses</div>
                        <div className="text-base font-bold text-[#111827] mt-0.5">
                          {formatINR(selectedPreset.essentialExpenses)}
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#E5E7EB]">
                        <div className="text-xs text-[#6B7280]">Available for goals</div>
                        <div className="text-base font-bold text-[#111827] mt-0.5">
                          {formatINR(selectedPreset.availableForGoals)}
                        </div>
                      </div>

                      {/* Audit Item 8: Illustrative SIP range label */}
                      <div className="bg-[#ECFDF5] p-3 rounded-xl border border-[#A7F3D0]">
                        <div className="text-xs text-[#047857] font-medium">Illustrative SIP range</div>
                        <div className="text-base font-bold text-[#059669] mt-0.5">
                          ₹{(selectedPreset.suggestedInvestmentMin / 1000).toFixed(0)}K–₹{(selectedPreset.suggestedInvestmentMax / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>

                    {/* Reasoning text */}
                    <p className="text-xs text-[#4B5563] leading-relaxed mb-4 bg-white p-3.5 rounded-xl border border-[#E5E7EB]">
                      {selectedPreset.reasoning}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setShowCalculationModal(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:text-[#047857] hover:underline cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                      >
                        View calculation →
                      </button>
                      <span className="text-[11px] text-[#9CA3AF]">
                        Example Product Demonstration
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Custom Question Bar */}
          <div className="p-4 bg-[#FAF9F5] border-t border-[#E5E7EB]">
            <form onSubmit={handleCustomSubmit} className="relative flex items-center">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Try: 'I earn ₹20,000 a month. How much should I invest?'"
                className="w-full pl-4 pr-24 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                aria-label="Ask a financial question"
              />
              <button
                type="submit"
                className="absolute right-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#111827] hover:bg-[#059669] rounded-lg transition-colors flex items-center gap-1 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
              >
                Ask
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Calculation Methodology Modal */}
      {showCalculationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4">
              <h3 className="text-lg font-bold text-[#111827] font-serif">Calculation Logic</h3>
              <button
                onClick={() => setShowCalculationModal(false)}
                className="text-[#6B7280] hover:text-[#111827] text-sm font-bold cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-[#4B5563]">
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E5E7EB]">
                <div className="font-bold text-[#111827] mb-1">1. Essential Expenses</div>
                <div>Allocates ~40% of income for rent, food, and basic necessities.</div>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E5E7EB]">
                <div className="font-bold text-[#111827] mb-1">2. Emergency Buffer</div>
                <div>Ensures 3-6 months of liquid cash before aggressive wealth building.</div>
              </div>

              <div className="p-3 bg-[#ECFDF5] rounded-xl border border-[#A7F3D0] text-[#047857]">
                <div className="font-bold mb-1">3. Monthly SIP Target</div>
                <div>Directs 20-30% of take-home pay into index SIPs for steady compounding.</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowCalculationModal(false)}
                className="px-4 py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
