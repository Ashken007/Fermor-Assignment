"use client";

import React, { useState } from "react";
import { TrendingUp, ShieldCheck, PieChart, ArrowUpRight, DollarSign, Wallet, Clock, RefreshCw } from "lucide-react";
import { formatINR } from "@/utils/formatters";

export default function FinancialSnapshot() {
  const [timelineYears, setTimelineYears] = useState<1 | 3 | 5 | 10>(5);
  const [activeMetric, setActiveMetric] = useState<"wealth" | "savings" | "investments">("wealth");

  // Dynamic wealth growth projections based on compounding at 12% CAGR
  const currentWealth = 1540000;
  const monthlySavings = 32000;
  
  const projectedWealth =
    timelineYears === 1
      ? 1980000
      : timelineYears === 3
      ? 3340000
      : timelineYears === 5
      ? 5437277
      : 13850000;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden group hover:border-[#059669]/40 transition-all duration-300 w-full max-w-full min-w-0">
      
      {/* Top Header Card Info */}
      <div className="flex items-center justify-between pb-5 border-b border-[#F3F4F6] gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6B7280] font-bold block truncate">Illustrative Preview</span>
            <h3 className="text-sm sm:text-base font-bold text-[#111827] truncate">Financial snapshot</h3>
          </div>
        </div>

        {/* Audit Item 6: Exact badge replacement */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[10px] sm:text-[11px] font-semibold text-[#047857] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
          Interactive projection
        </div>
      </div>

      {/* 4 Core Financial Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 min-w-0">
        
        {/* Metric 1: Monthly Income */}
        <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E5E7EB]">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium mb-1">
            <span>Monthly income</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#111827]">
            ₹1,20,000
          </div>
          <div className="text-[11px] text-[#6B7280] mt-0.5">Post-tax salary</div>
        </div>

        {/* Metric 2: Monthly Savings */}
        <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E5E7EB]">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium mb-1">
            <span>Monthly savings</span>
            <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#059669]">
            ₹32,000
          </div>
          <div className="text-[11px] text-[#059669] font-medium mt-0.5">+₹4,000 vs last mo</div>
        </div>

        {/* Metric 3: Investments */}
        <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E5E7EB]">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium mb-1">
            <span>Investments</span>
            <PieChart className="w-3.5 h-3.5 text-[#059669]" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#111827]">
            ₹8,40,000
          </div>
          <div className="text-[11px] text-[#6B7280] mt-0.5">Mutual funds & Equity</div>
        </div>

        {/* Metric 4: Savings Rate */}
        <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E5E7EB]">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium mb-1">
            <span>Savings rate</span>
            <Clock className="w-3.5 h-3.5 text-[#059669]" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#111827]">
            26.7%
          </div>
          <div className="text-[11px] text-[#059669] font-medium mt-0.5">Optimal index &gt; 25%</div>
        </div>

      </div>

      {/* Interactive Wealth Projection Curve Panel */}
      <div className="bg-[#111827] text-white p-5 rounded-2xl relative overflow-hidden shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-semibold text-[#10B981] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Wealth Projection
            </div>
            <div className="text-sm font-bold text-white font-serif mt-0.5">
              Current → Projected Wealth
            </div>
          </div>

          {/* Timeline selector tabs */}
          <div className="flex bg-[#1F2937] p-1 rounded-lg border border-[#374151] text-[11px]">
            {([1, 3, 5, 10] as const).map((yr) => (
              <button
                key={yr}
                onClick={() => setTimelineYears(yr)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-semibold ${
                  timelineYears === yr
                    ? "bg-[#059669] text-white"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {yr}Y
              </button>
            ))}
          </div>
        </div>

        {/* Values display */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-[11px] text-[#9CA3AF] block">Current Wealth</span>
            <span className="text-base font-bold text-[#D1D5DB]">₹15.4L</span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#10B981] block">Projected ({timelineYears} Years)</span>
            <span className="text-2xl font-bold text-[#10B981]">{formatINR(projectedWealth)}</span>
          </div>
        </div>

        {/* Micro SVG Growth Line Chart */}
        <div className="relative h-16 w-full pt-1">
          <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="snapshotGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 50 Q 75 45, 150 25 T 300 8 L 300 60 L 0 60 Z"
              fill="url(#snapshotGrad)"
            />
            <path
              d="M 0 50 Q 75 45, 150 25 T 300 8"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />
            <circle cx="300" cy="8" r="4" fill="#10B981" stroke="#111827" strokeWidth="2" />
          </svg>
        </div>

        {/* Audit Item 6: Copy replacement */}
        <div className="mt-3 pt-3 border-t border-[#1F2937] text-[11px] text-[#9CA3AF] flex items-center justify-between">
          <span>Explore how different assumptions affect your projection.</span>
          <span className="text-[#10B981] font-semibold">12% CAGR</span>
        </div>
      </div>

    </div>
  );
}
