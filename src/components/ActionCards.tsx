"use client";

import React, { useState } from "react";
import { TrendingUp, ShieldCheck, Compass, BookOpen, ArrowUpRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface ActionCard {
  id: string;
  title: string;
  badge: string;
  desc: string;
  icon: React.ElementType;
  items: string[];
  modalTitle: string;
  modalDesc: string;
  modalCTA: string;
}

const ACTION_CARDS: ActionCard[] = [
  {
    id: "invest",
    title: "Invest",
    badge: "Wealth Compounding",
    desc: "Build long-term wealth through disciplined index SIPs and diversified equity asset allocation.",
    icon: TrendingUp,
    items: ["Stocks", "ETFs", "Mutual Funds"],
    modalTitle: "Invest",
    modalDesc: "Explore investment options, SIP planning and market research designed to help you make informed decisions.",
    modalCTA: "Explore investments",
  },
  {
    id: "save",
    title: "Save",
    badge: "Liquid Security",
    desc: "Protect your downside with high-yield liquid emergency reserves and short-term debt instruments.",
    icon: ShieldCheck,
    items: ["Emergency Fund", "Liquid Funds", "Fixed Deposits"],
    modalTitle: "Save",
    modalDesc: "Explore liquid savings options, emergency buffers, and fixed yield strategies.",
    modalCTA: "Explore savings",
  },
  {
    id: "plan",
    title: "Plan",
    badge: "Goal Strategy",
    desc: "Map out major financial milestones, retirement horizons, and tax optimization frameworks.",
    icon: Compass,
    items: ["Goal Planner", "Retirement Index", "Tax Savings (80C/NPS)"],
    modalTitle: "Plan",
    modalDesc: "Model long-term goals, retirement timelines, and tax efficiency strategies.",
    modalCTA: "Explore planning",
  },
  {
    id: "learn",
    title: "Learn",
    badge: "Financial Clarity",
    desc: "Master personal finance math with practical guides written specifically for Indian context.",
    icon: BookOpen,
    items: ["SIP Math Guide", "Tax Planning 101", "Asset Allocation 101"],
    modalTitle: "Learn",
    modalDesc: "Access practical financial guides, compounding math, and market fundamentals.",
    modalCTA: "Explore guides",
  },
];

interface ActionCardsProps {
  onOpenAuth?: (mode: "signup") => void;
}

export default function ActionCards({ onOpenAuth }: ActionCardsProps) {
  const [activeModal, setActiveModal] = useState<ActionCard | null>(null);

  return (
    <section id="action-cards" className="py-20 bg-[#FAF9F5] border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#059669] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Clear Next Steps
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-serif mb-4">
            When you&apos;re ready, take the next step.
          </h2>
          <p className="text-lg text-[#4B5563]">
            Whether you want to start a monthly SIP, build an emergency buffer, or plan your tax savings, Fermor guides your decision.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACTION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveModal(card)}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between hover:border-[#059669] hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#E5E7EB] flex items-center justify-center text-[#059669] group-hover:bg-[#059669] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#111827] font-serif mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#4B5563] leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                {/* Sub items list */}
                <div>
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#F3F4F6]">
                    {card.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#374151] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-2.5 bg-[#FAF9F5] group-hover:bg-[#111827] text-[#111827] group-hover:text-white border border-[#E5E7EB] group-hover:border-[#111827] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    Inspect {card.title}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Action Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-[calc(100vw-32px)] sm:max-w-md w-full p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB] relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-[#6B7280] hover:text-[#111827] w-8 h-8 rounded-full bg-[#FAF9F5] flex items-center justify-center font-bold text-sm cursor-pointer"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
                {React.createElement(activeModal.icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <span className="text-xs font-bold text-[#047857]">{activeModal.badge}</span>
                <h3 className="text-2xl font-bold text-[#111827] font-serif">{activeModal.modalTitle}</h3>
              </div>
            </div>

            <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
              {activeModal.modalDesc}
            </p>

            <div className="space-y-2.5 mb-6 bg-[#FAF9F5] p-4 rounded-xl border border-[#E5E7EB]">
              <div className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">Key Product Tools:</div>
              {activeModal.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-[#374151] font-semibold">
                  <span>{item}</span>
                  <span className="text-[#059669]">Available</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                if (onOpenAuth) onOpenAuth("signup");
              }}
              className="w-full py-3 bg-[#111827] hover:bg-[#059669] text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {activeModal.modalCTA}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
