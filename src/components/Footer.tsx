"use client";

import React from "react";
import { ArrowUpRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#FAF9F5] border-t border-[#E5E7EB] pt-16 pb-12 text-[#4B5563]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E5E7EB]">
          
          {/* Brand Info & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-lg p-1 w-fit"
              aria-label="Scroll to top of FERMOR homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center text-white font-serif font-bold text-lg group-hover:bg-[#059669] transition-colors">
                F
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold tracking-tight text-[#111827] font-serif">
                  FERMOR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] inline-block"></span>
              </div>
            </a>

            <p className="text-sm text-[#6B7280] max-w-sm leading-relaxed">
              FERMOR is a modern Indian personal finance platform designed to help young professionals understand their money, evaluate trade-offs, and plan with confidence.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#059669] bg-[#ECFDF5] px-3 py-1.5 rounded-lg border border-[#A7F3D0] w-fit">
              <ShieldCheck className="w-4 h-4" />
              Built for Indian Financial Decisions ₹
            </div>
          </div>

          {/* Nav Links Column 1: Core Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#111827] tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("overview")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ask")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  Ask Fermor
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("calculate")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  Calculate SIP
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("plan")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  Future Plan
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: Tools & Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#111827] tracking-wider">Interactive Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("calculate")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  SIP Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ask")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  Emergency Buffer Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("action-cards")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  Product Entry Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("overview")}
                  className="hover:text-[#111827] transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-xs"
                >
                  Wealth Snapshot
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 3: Philosophy */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#111827] tracking-wider">Product Philosophy</h4>
            <div className="space-y-2 text-xs text-[#6B7280] leading-relaxed">
              <div className="font-semibold text-[#111827]">Understand → Plan → Act</div>
              <div>Designed to convert financial anxiety into clear trade-off mathematics and actionable planning.</div>
            </div>
          </div>

        </div>

        {/* Educational Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p className="max-w-2xl leading-relaxed">
            * Disclaimer: All calculations, projections, and scenarios shown are for educational and financial planning demonstration purposes. Past market returns are not indicative of future results.
          </p>

          <div className="text-right shrink-0">
            <div>© 2026 FERMOR Technologies Pvt. Ltd.</div>
            <div className="text-[11px] text-[#9CA3AF] mt-0.5">All rights reserved.</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
