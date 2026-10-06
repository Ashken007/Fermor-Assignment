"use client";

import React, { useState } from "react";
import { Sparkles, TrendingUp, Compass, Target, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { formatINR, formatCompactINR } from "@/utils/formatters";

type Horizon = "Today" | "2 Years" | "5 Years" | "10 Years" | "15 Years";
type Strategy = "Conservative" | "Moderate" | "Aggressive";

export default function FutureProjection() {
  const [activeHorizon, setActiveHorizon] = useState<Horizon>("5 Years");
  const [strategy, setStrategy] = useState<Strategy>("Moderate");

  const currentWealth = 1540000; // ₹15.4L base
  const monthlySIP = 25000;

  // Rate based on strategy
  const rateMap: Record<Strategy, number> = {
    Conservative: 0.08,
    Moderate: 0.12,
    Aggressive: 0.15,
  };

  const yearsMap: Record<Horizon, number> = {
    Today: 0,
    "2 Years": 2,
    "5 Years": 5,
    "10 Years": 10,
    "15 Years": 15,
  };

  const years = yearsMap[activeHorizon];
  const rate = rateMap[strategy];

  // Calculate future projection value
  const calculateWealth = (y: number, r: number) => {
    if (y === 0) return currentWealth;
    const months = y * 12;
    const mRate = r / 12;
    let val = currentWealth * Math.pow(1 + mRate, months);
    val += monthlySIP * ((Math.pow(1 + mRate, months) - 1) / mRate) * (1 + mRate);
    return Math.round(val);
  };

  const projectedValue = calculateWealth(years, rate);
  const totalGains = projectedValue - (currentWealth + monthlySIP * years * 12);

  // Milestones data
  const milestones = [
    {
      horizon: "2 Years",
      title: "6-Month Emergency Shield",
      target: "₹22.5 Lakhs",
      desc: "Fully funded liquid reserve covering 6 months of expenses + health buffers.",
      icon: ShieldCheck,
      achieved: years >= 2,
    },
    {
      horizon: "5 Years",
      title: "First Major Goal / Home Down Payment",
      target: "₹42.8 Lakhs",
      desc: "Capital ready for home down-payment without liquidating retirement funds.",
      icon: Target,
      achieved: years >= 5,
    },
    {
      horizon: "10 Years",
      title: "Financial Independence Milestone",
      target: "₹1.15 Crore",
      desc: "Compounding returns begin exceeding annual salary income.",
      icon: Award,
      achieved: years >= 10,
    },
    {
      horizon: "15 Years",
      title: "Early Retirement Corpus",
      target: "₹2.68 Crore",
      desc: "Complete financial autonomy with perpetual passive withdrawal capacity.",
      icon: Sparkles,
      achieved: years >= 15,
    },
  ];

  return (
    <section id="plan" className="py-20 bg-white border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E5E7EB] text-xs font-semibold text-[#059669] mb-4">
            <Compass className="w-3.5 h-3.5" />
            Long-Term Financial Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-serif mb-4">
            See where today&apos;s decisions can take you.
          </h2>
          <p className="text-lg text-[#4B5563]">
            Small monthly habits compound into life-changing freedom. Toggle the timeline below to preview your future net worth.
          </p>
        </div>

        {/* Timeline Horizon Selector Bar */}
        <div className="bg-[#FAF9F5] border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-md mb-12 w-full max-w-full min-w-0 overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#E5E7EB] pb-6">
            
            {/* Timeline Buttons */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                Select Horizon
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Today", "2 Years", "5 Years", "10 Years", "15 Years"] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setActiveHorizon(h)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                      activeHorizon === h
                        ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                        : "bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#9CA3AF]"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Buttons */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                Strategy Mode
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-[#E5E7EB]">
                {(["Conservative", "Moderate", "Aggressive"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStrategy(s)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      strategy === s
                        ? "bg-[#059669] text-white shadow-xs"
                        : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                  >
                    {s} ({rateMap[s] * 100}%)
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Dynamic Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Current Wealth */}
            <div className="md:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB]">
              <div className="text-xs font-medium text-[#6B7280] mb-1">Today&apos;s Starting Wealth</div>
              <div className="text-2xl font-bold text-[#111827]">{formatINR(currentWealth)}</div>
              <div className="text-xs text-[#6B7280] mt-1">+ ₹{monthlySIP.toLocaleString("en-IN")}/mo recurring SIP</div>
            </div>

            {/* Growth Arrow */}
            <div className="md:col-span-1 flex justify-center my-1 md:my-0">
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
                <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
              </div>
            </div>

            {/* Projected Wealth */}
            <div className="md:col-span-7 bg-[#111827] text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-[#111827] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-[#10B981] flex items-center gap-1">
                  Projected Wealth ({activeHorizon})
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#10B981] mt-1">
                  {formatINR(projectedValue)}
                </div>
                <div className="text-xs text-[#9CA3AF] mt-1">
                  Includes {formatCompactINR(totalGains > 0 ? totalGains : 0)} pure compounding returns
                </div>
              </div>

              <div className="bg-[#1F2937] p-3 rounded-xl border border-[#374151] text-right shrink-0">
                <div className="text-[11px] text-[#9CA3AF]">Assumed Return</div>
                <div className="text-base font-bold text-white">{strategy} ({rateMap[strategy] * 100}% CAGR)</div>
              </div>
            </div>

          </div>

        </div>

        {/* Milestone Cards Grid */}
        <h3 className="text-xl font-bold text-[#111827] font-serif mb-6 text-center">
          Key Wealth Milestones Unlocked
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-200 ${
                  m.achieved
                    ? "bg-[#FAF9F5] border-[#059669] shadow-sm"
                    : "bg-white border-[#E5E7EB] opacity-75"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${m.achieved ? "bg-[#059669] text-white" : "bg-[#F3F4F6] text-[#6B7280]"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${m.achieved ? "bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]" : "bg-[#F3F4F6] text-[#6B7280]"}`}>
                    {m.horizon}
                  </span>
                </div>

                <div className="text-lg font-bold text-[#111827] mb-1 font-serif">{m.target}</div>
                <h4 className="text-sm font-semibold text-[#374151] mb-2">{m.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
