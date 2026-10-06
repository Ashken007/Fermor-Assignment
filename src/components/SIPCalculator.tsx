"use client";

import React, { useState, useMemo } from "react";
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, Info, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { formatINR, formatCompactINR, calculateSIP } from "@/utils/formatters";

export default function SIPCalculator() {
  // Default values: ₹10,000, 12%, 10 years
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [durationYears, setDurationYears] = useState<number>(10);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Defensive values to guarantee no NaN, Infinity, or negative numbers
  const safeInvestment = useMemo(() => {
    if (isNaN(monthlyInvestment) || monthlyInvestment < 0) return 1000;
    return Math.max(1000, Math.min(100000, monthlyInvestment));
  }, [monthlyInvestment]);

  const safeReturn = useMemo(() => {
    if (isNaN(expectedReturn) || expectedReturn < 0) return 5;
    return Math.max(5, Math.min(20, expectedReturn));
  }, [expectedReturn]);

  const safeDuration = useMemo(() => {
    if (isNaN(durationYears) || durationYears < 1) return 1;
    return Math.max(1, Math.min(30, durationYears));
  }, [durationYears]);

  // Compute live compounding calculations
  const sipResult = useMemo(() => {
    return calculateSIP(safeInvestment, safeReturn, safeDuration);
  }, [safeInvestment, safeReturn, safeDuration]);

  const { totalInvested, estimatedReturns, futureValue, yearlyData } = sipResult;

  // Max value for SVG Y-axis scaling
  const maxY = useMemo(() => {
    const last = yearlyData[yearlyData.length - 1];
    return last && last.futureValue > 0 ? last.futureValue * 1.1 : 100000;
  }, [yearlyData]);

  // Generate SVG path strings for Invested area & Total Future Value area
  const svgWidth = 500;
  const svgHeight = 200;

  const pointsInvested = useMemo(() => {
    return yearlyData.map((d, i) => {
      const x = (i / Math.max(1, yearlyData.length - 1)) * svgWidth;
      const y = svgHeight - (d.invested / maxY) * svgHeight;
      return { x, y, data: d };
    });
  }, [yearlyData, maxY]);

  const pointsFutureValue = useMemo(() => {
    return yearlyData.map((d, i) => {
      const x = (i / Math.max(1, yearlyData.length - 1)) * svgWidth;
      const y = svgHeight - (d.futureValue / maxY) * svgHeight;
      return { x, y, data: d };
    });
  }, [yearlyData, maxY]);

  const pathFV = useMemo(() => {
    return pointsFutureValue.reduce(
      (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
      ""
    );
  }, [pointsFutureValue]);

  const pathInvested = useMemo(() => {
    return pointsInvested.reduce(
      (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
      ""
    );
  }, [pointsInvested]);

  const activeDataPoint = hoveredYear !== null && yearlyData[hoveredYear] ? yearlyData[hoveredYear] : yearlyData[yearlyData.length - 1];

  return (
    <section id="calculate" className="py-20 bg-white border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E5E7EB] text-xs font-semibold text-[#059669] mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Financial Math
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-serif mb-4">
            Don&apos;t just get an answer. Understand it.
          </h2>
          <p className="text-lg text-[#4B5563]">
            See the compounding magic of disciplined monthly investments. Adjust the variables and inspect how money multiplies over time.
          </p>
        </div>

        {/* SIP Calculator Container */}
        <div className="bg-[#FAF9F5] border border-[#E5E7EB] rounded-2xl p-4 sm:p-8 lg:p-10 shadow-lg w-full max-w-full min-w-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-w-0">
            
            {/* Left Controls Panel */}
            <div className="lg:col-span-5 space-y-7 bg-white p-4 sm:p-7 rounded-2xl border border-[#E5E7EB] shadow-xs min-w-0">
              <h3 className="text-lg font-bold text-[#111827] border-b border-[#F3F4F6] pb-3 flex items-center justify-between">
                SIP Parameters
                <span className="text-xs font-semibold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                  Monthly Compounding
                </span>
              </h3>

              {/* Monthly Investment Slider (Range: ₹1,000 - ₹1,00,000) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="sip-investment-input" className="text-sm font-semibold text-[#374151]">
                    Monthly investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] font-bold text-sm">₹</span>
                    <input
                      id="sip-investment-input"
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : Number(e.target.value);
                        setMonthlyInvestment(val);
                      }}
                      onBlur={() => setMonthlyInvestment(safeInvestment)}
                      className="w-32 pl-7 pr-3 py-1 bg-[#FAF9F5] border border-[#E5E7EB] rounded-lg text-sm font-bold text-[#111827] text-right focus:outline-hidden focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={safeInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer"
                  aria-label="Monthly investment slider"
                />
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-medium">
                  <span>₹1,000</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Expected Return Rate Slider (Range: 5% - 20%) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="sip-return-input" className="text-sm font-semibold text-[#374151]">
                    Expected return (p.a)
                  </label>
                  <div className="relative">
                    <input
                      id="sip-return-input"
                      type="number"
                      step={0.5}
                      value={expectedReturn}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : Number(e.target.value);
                        setExpectedReturn(val);
                      }}
                      onBlur={() => setExpectedReturn(safeReturn)}
                      className="w-24 px-3 py-1 bg-[#FAF9F5] border border-[#E5E7EB] rounded-lg text-sm font-bold text-[#059669] text-right focus:outline-hidden focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#059669] font-bold text-sm">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={5}
                  max={20}
                  step={0.5}
                  value={safeReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer"
                  aria-label="Expected return rate slider"
                />
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-medium">
                  <span>5% (Conservative)</span>
                  <span>12% (Balanced)</span>
                  <span>20% (High Growth)</span>
                </div>
              </div>

              {/* Duration Slider (Range: 1 - 30 Years) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="sip-duration-input" className="text-sm font-semibold text-[#374151]">
                    Duration
                  </label>
                  <div className="relative">
                    <input
                      id="sip-duration-input"
                      type="number"
                      value={durationYears}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : Number(e.target.value);
                        setDurationYears(val);
                      }}
                      onBlur={() => setDurationYears(safeDuration)}
                      className="w-24 px-3 py-1 bg-[#FAF9F5] border border-[#E5E7EB] rounded-lg text-sm font-bold text-[#111827] text-right focus:outline-hidden focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] font-bold text-xs">Yrs</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={safeDuration}
                  onChange={(e) => setDurationYears(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer"
                  aria-label="Duration years slider"
                />
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-medium">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-3 border-t border-[#F3F4F6]">
                <div className="text-xs font-semibold text-[#6B7280] mb-2">Popular Presets:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setMonthlyInvestment(2000); setExpectedReturn(12); setDurationYears(5); }}
                    className="px-2.5 py-1 text-xs bg-[#FAF9F5] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-md font-medium text-[#374151] cursor-pointer"
                  >
                    Starter (₹2k/5yr)
                  </button>
                  <button
                    onClick={() => { setMonthlyInvestment(10000); setExpectedReturn(12); setDurationYears(10); }}
                    className="px-2.5 py-1 text-xs bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] rounded-md font-bold text-[#047857] cursor-pointer"
                  >
                    Default (₹10k/10yr)
                  </button>
                  <button
                    onClick={() => { setMonthlyInvestment(25000); setExpectedReturn(12); setDurationYears(15); }}
                    className="px-2.5 py-1 text-xs bg-[#FAF9F5] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-md font-medium text-[#374151] cursor-pointer"
                  >
                    Long Term (₹25k/15yr)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Output & Interactive Chart Panel */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* 3 Main Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E5E7EB]">
                  <div className="text-xs font-medium text-[#6B7280] mb-1">Total invested</div>
                  <div className="text-xl sm:text-2xl font-bold text-[#111827]">
                    {formatCompactINR(totalInvested)}
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] mt-1 font-medium">
                    {formatINR(totalInvested)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E5E7EB]">
                  <div className="text-xs font-medium text-[#6B7280] mb-1">Estimated returns</div>
                  <div className="text-xl sm:text-2xl font-bold text-[#059669]">
                    {formatCompactINR(estimatedReturns)}
                  </div>
                  <div className="text-[11px] text-[#059669] mt-1 font-medium">
                    {formatINR(estimatedReturns)}
                  </div>
                </div>

                <div className="bg-[#111827] text-white p-4 rounded-xl shadow-md border border-[#111827]">
                  <div className="text-xs font-medium text-[#9CA3AF] mb-1">Future value</div>
                  <div className="text-xl sm:text-2xl font-bold text-[#10B981]">
                    {formatCompactINR(futureValue)}
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] mt-1 font-medium">
                    {formatINR(futureValue)}
                  </div>
                </div>
              </div>

              {/* Interactive Area Chart Box */}
              <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Growth Breakdown Over {safeDuration} Years</h4>
                    <p className="text-xs text-[#6B7280]">Hover or tap on points to see year-by-year compounding</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#D1D5DB]"></span>
                      <span className="text-[#6B7280]">Invested</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#059669]"></span>
                      <span className="text-[#059669] font-bold">Future Value</span>
                    </div>
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="relative h-56 w-full pt-2">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="fvGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="invGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={svgHeight * pct}
                        x2={svgWidth}
                        y2={svgHeight * pct}
                        stroke="#F3F4F6"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Future Value Area Fill */}
                    <path
                      d={`${pathFV} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`}
                      fill="url(#fvGradient)"
                    />
                    
                    {/* Invested Area Fill */}
                    <path
                      d={`${pathInvested} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`}
                      fill="url(#invGradient)"
                    />

                    {/* Invested Line */}
                    <path
                      d={pathInvested}
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />

                    {/* Future Value Line */}
                    <path
                      d={pathFV}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="3"
                    />

                    {/* Interactive Points */}
                    {pointsFutureValue.map((p, idx) => (
                      <g
                        key={idx}
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredYear(idx)}
                        onMouseLeave={() => setHoveredYear(null)}
                      >
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={hoveredYear === idx ? 6 : 3}
                          fill="#059669"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="transition-all"
                        />
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Audit Item 7: Disclaimer & Hover detail banner */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-3 border-t border-[#F3F4F6]">
                  {activeDataPoint ? (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#111827]">Year {activeDataPoint.year}:</span>
                      <span className="text-[#6B7280]">Invested: <strong className="text-[#111827]">{formatCompactINR(activeDataPoint.invested)}</strong></span>
                      <span className="text-[#059669] font-bold">Corpus: {formatCompactINR(activeDataPoint.futureValue)}</span>
                    </div>
                  ) : null}

                  <div className="text-[11px] text-[#6B7280] italic">
                    * Illustrative projection. Actual returns may vary based on market conditions.
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
