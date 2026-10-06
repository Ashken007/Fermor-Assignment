"use client";

import React, { useState } from "react";
import { LayoutDashboard, TrendingUp, PieChart, ArrowUpRight, DollarSign, Wallet, ArrowDownRight, Layers, Filter } from "lucide-react";
import { formatINR } from "@/utils/formatters";

export default function FinancialOverview() {
  const [timeframe, setTimeframe] = useState<"1M" | "6M" | "1Y" | "ALL">("1Y");
  const [activeTab, setActiveTab] = useState<"allocation" | "spending">("allocation");

  // Timeframe multiplier for demo data updates
  const netWorthValue = timeframe === "1M" ? 3320000 : timeframe === "6M" ? 3150000 : timeframe === "1Y" ? 3480000 : 3850000;
  const growthRate = timeframe === "1M" ? "+2.4%" : timeframe === "6M" ? "+8.1%" : timeframe === "1Y" ? "+14.2%" : "+28.6%";

  return (
    <section id="overview" className="py-20 bg-[#FAF9F5] border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#059669] mb-4">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Unified Wealth Dashboard
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-serif mb-4">
            See your financial picture at a glance.
          </h2>
          {/* Audit Item 2: Exact copy update */}
          <p className="text-lg text-[#4B5563]">
            Bring your financial picture together in one clear view.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#111827] text-white flex items-center justify-center font-bold">
                F
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111827]">Overview & Asset Summary</h3>
                <span className="text-xs text-[#6B7280]">Sample Portfolio Preview</span>
              </div>
            </div>

            {/* Timeframe selector controls */}
            <div className="flex items-center gap-2">
              <div className="bg-white p-1 rounded-lg border border-[#E5E7EB] flex text-xs font-medium">
                {(["1M", "6M", "1Y", "ALL"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      timeframe === t
                        ? "bg-[#111827] text-white font-bold"
                        : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Net Worth */}
              <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] mb-1">
                  Net Worth
                  <span className="text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full font-bold border border-[#A7F3D0]">
                    {growthRate}
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#111827]">
                  {formatINR(netWorthValue)}
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1">Liquid + Investments</div>
              </div>

              {/* Monthly Savings */}
              <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] mb-1">
                  Monthly Savings
                  <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
                </div>
                <div className="text-2xl font-bold text-[#059669]">
                  ₹32,000
                </div>
                <div className="text-[11px] text-[#059669] mt-1">Consistent monthly surplus</div>
              </div>

              {/* Investments */}
              <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] mb-1">
                  Investments
                  <Layers className="w-3.5 h-3.5 text-[#059669]" />
                </div>
                <div className="text-2xl font-bold text-[#111827]">
                  ₹22,40,000
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1">Mutual Funds & Debt</div>
              </div>

              {/* Savings Rate */}
              <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] mb-1">
                  Savings Rate
                  <PieChart className="w-3.5 h-3.5 text-[#059669]" />
                </div>
                <div className="text-2xl font-bold text-[#111827]">
                  31.4%
                </div>
                <div className="text-[11px] text-[#059669] font-medium mt-1">Healthy savings tier</div>
              </div>

            </div>

            {/* Dashboard Graphs & Allocations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left 7 Cols: Wealth Trend SVG Chart */}
              <div className="lg:col-span-7 bg-[#FAF9F5] p-5 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Net Worth Growth Trend</h4>
                    <span className="text-xs text-[#6B7280]">Historical trajectory over last {timeframe}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                      Current: ₹34.8L
                    </span>
                  </div>
                </div>

                <div className="relative h-48 w-full mt-2 min-w-0 overflow-hidden">
                  <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="dashboardTrendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M 0 140 Q 125 120, 250 80 T 500 20 L 500 180 L 0 180 Z"
                      fill="url(#dashboardTrendGrad)"
                    />
                    {/* Curve line */}
                    <path
                      d="M 0 140 Q 125 120, 250 80 T 500 20"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="3"
                    />
                    {/* End point marker */}
                    <circle cx="500" cy="20" r="5" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] sm:text-xs text-[#6B7280] pt-3 border-t border-[#E5E7EB] mt-2">
                  <span>Start: ₹28.2L</span>
                  <span>Mid: ₹31.0L</span>
                  <span className="font-bold text-[#059669]">Current: ₹34.8L</span>
                </div>
              </div>

              {/* Right 5 Cols: Breakdown Tabs (Asset Allocation vs Spending) */}
              <div className="lg:col-span-5 bg-[#FAF9F5] p-5 rounded-2xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("allocation")}
                      className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        activeTab === "allocation"
                          ? "bg-[#111827] text-white"
                          : "text-[#6B7280] hover:text-[#111827]"
                      }`}
                    >
                      Asset Allocation
                    </button>
                    <button
                      onClick={() => setActiveTab("spending")}
                      className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        activeTab === "spending"
                          ? "bg-[#111827] text-white"
                          : "text-[#6B7280] hover:text-[#111827]"
                      }`}
                    >
                      Monthly Spend
                    </button>
                  </div>
                </div>

                {activeTab === "allocation" ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#111827]">Equity Index Funds</span>
                        <span className="font-bold text-[#059669]">₹13.44L (60%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-[#059669] rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#111827]">Debt & Fixed Savings</span>
                        <span className="font-bold text-[#111827]">₹5.60L (25%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-[#111827] rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#111827]">Liquid Reserves</span>
                        <span className="font-bold text-[#111827]">₹2.24L (10%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-[#6B7280] rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#111827]">Gold Reserves</span>
                        <span className="font-bold text-[#111827]">₹1.12L (5%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#111827]">Rent & Utilities</span>
                      <span className="text-xs font-bold text-[#111827]">₹35,000</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#059669]">SIP & Investments</span>
                      <span className="text-xs font-bold text-[#059669]">₹32,000</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#111827]">Groceries & Essentials</span>
                      <span className="text-xs font-bold text-[#111827]">₹18,000</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#111827]">Lifestyle & Discretionary</span>
                      <span className="text-xs font-bold text-[#111827]">₹15,000</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
