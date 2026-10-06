"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, ShieldCheck, Compass, MessageSquare, Calculator, LayoutDashboard, User, LogOut, ChevronDown, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onOpenAuth: (mode: "login" | "signup") => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("overview");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for navbar background elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key handler to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
        setShowAccountModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll-Spy using IntersectionObserver
  useEffect(() => {
    const sectionIds = ["overview", "ask", "calculate", "plan"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -40% 0px",
      threshold: 0.15,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Overview", id: "overview", icon: LayoutDashboard },
    { label: "Ask", id: "ask", icon: MessageSquare },
    { label: "Calculate", id: "calculate", icon: Calculator },
    { label: "Plan", id: "plan", icon: Compass },
  ];

  // User initials
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? "bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs py-3"
            : "bg-[#FAF9F5] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Dot */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669] rounded-lg p-1"
              aria-label="FERMOR Homepage"
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

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 bg-white/90 p-1.5 rounded-full border border-[#E5E7EB] shadow-2xs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669] ${
                      isActive
                        ? "bg-[#111827] text-white shadow-xs font-bold"
                        : "text-[#4B5563] hover:text-[#111827] hover:bg-[#FAF9F5]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#10B981]" : "text-[#059669]"}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                /* Logged-In User Control */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-[#E5E7EB] hover:border-[#059669] rounded-xl shadow-2xs transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                    aria-expanded={userDropdownOpen}
                    aria-label="User account menu"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#059669] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {userInitial}
                    </div>
                    <span className="text-xs font-bold text-[#111827] max-w-[120px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#6B7280] transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-[#E5E7EB] mb-1">
                        <div className="text-xs font-bold text-[#111827] truncate">{user.name}</div>
                        <div className="text-[11px] text-[#6B7280] truncate">{user.email}</div>
                      </div>

                      <button
                        onClick={() => scrollToSection("overview")}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-[#374151] hover:bg-[#FAF9F5] hover:text-[#111827] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#059669]" />
                        Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setShowAccountModal(true);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-[#374151] hover:bg-[#FAF9F5] hover:text-[#111827] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-[#059669]" />
                        Account Settings
                      </button>

                      <div className="border-t border-[#E5E7EB] my-1"></div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Logged-Out Actions */
                <>
                  <button
                    onClick={() => onOpenAuth("login")}
                    className="text-xs font-semibold text-[#4B5563] hover:text-[#111827] px-3 py-2 rounded-lg hover:bg-white/60 transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                  >
                    Log in
                  </button>

                  <button
                    onClick={() => onOpenAuth("signup")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#111827] hover:bg-[#059669] rounded-xl shadow-xs transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                  >
                    Get started
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              {!isAuthenticated && (
                <button
                  onClick={() => onOpenAuth("signup")}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#111827] rounded-lg"
                >
                  Get started
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#111827] hover:bg-white border border-[#E5E7EB] cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF9F5] border-b border-[#E5E7EB] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {isAuthenticated && user && (
              <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] rounded-xl mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#059669] text-white font-bold text-xs flex items-center justify-center">
                    {userInitial}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-[#111827] truncate">{user.name}</div>
                    <div className="text-[11px] text-[#6B7280] truncate">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-xs font-bold text-red-600 px-2 py-1 bg-red-50 rounded-lg"
                >
                  Log out
                </button>
              </div>
            )}

            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                      isActive
                        ? "bg-[#111827] text-white font-bold"
                        : "text-[#374151] hover:bg-white"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#10B981]" : "text-[#059669]"}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {!isAuthenticated && (
              <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("login");
                  }}
                  className="w-full py-2.5 text-sm font-semibold text-[#111827] bg-white border border-[#E5E7EB] rounded-xl text-center"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Account Settings Modal */}
      {showAccountModal && user && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAccountModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] relative">
            <button
              onClick={() => setShowAccountModal(false)}
              className="absolute top-4 right-4 text-[#6B7280] hover:text-[#111827] w-8 h-8 rounded-full bg-[#FAF9F5] flex items-center justify-center font-bold text-sm"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#059669] text-white font-bold text-base flex items-center justify-center">
                {userInitial}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111827] font-serif">{user.name}</h3>
                <p className="text-xs text-[#6B7280]">{user.email}</p>
              </div>
            </div>

            <div className="p-3 bg-[#ECFDF5] rounded-xl border border-[#A7F3D0] text-xs text-[#047857] flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              Demo Session Active (Persisted in browser)
            </div>

            <div className="space-y-3 text-xs text-[#4B5563]">
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280]">Account Type</span>
                <span className="font-bold text-[#111827]">Standard Demo Profile</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280]">Saved Portfolios</span>
                <span className="font-bold text-[#059669]">1 Portfolio Plan</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280]">Security</span>
                <span className="font-bold text-[#111827]">Encrypted Demo Session</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAccountModal(false);
                  logout();
                }}
                className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
              >
                Log out
              </button>
              <button
                onClick={() => setShowAccountModal(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#111827] rounded-xl hover:bg-[#059669] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
