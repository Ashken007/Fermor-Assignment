"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: "login" | "signup";
  onClose: () => void;
}

export default function AuthModal({ isOpen, initialMode = "signup", onClose }: AuthModalProps) {
  const { user, isAuthenticated, login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Sync prop changes during render without cascading useEffect renders
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setMode(initialMode);
      setSubmitted(false);
    }
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (mode === "signup" && !fullName.trim()) return;

    // Trigger demo login/signup session creation
    login(email, mode === "signup" ? fullName : undefined);
    setSubmitted(true);
  };

  const handleExploreDashboard = () => {
    onClose();
    const overviewEl = document.getElementById("overview");
    if (overviewEl) {
      const yOffset = -80;
      const y = overviewEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-[calc(100vw-32px)] sm:max-w-md w-full p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB] relative animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-[#111827] w-8 h-8 rounded-full bg-[#FAF9F5] flex items-center justify-center font-bold text-sm cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Case 1: User is already signed in */}
        {isAuthenticated && user && !submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 id="auth-modal-title" className="text-2xl font-bold text-[#111827] font-serif">
              You&apos;re already signed in
            </h3>
            <p className="text-sm text-[#4B5563]">
              Welcome back, <strong>{user.name}</strong> ({user.email}). Your demo financial plan is saved.
            </p>
            <button
              onClick={handleExploreDashboard}
              className="w-full py-3 bg-[#111827] text-white text-sm font-semibold rounded-xl cursor-pointer hover:bg-[#059669] transition-colors"
            >
              Open Dashboard
            </button>
          </div>
        ) : submitted ? (
          /* Case 2: Newly submitted signup/login success state */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 id="auth-modal-title" className="text-2xl font-bold text-[#111827] font-serif">
              You&apos;re all set.
            </h3>
            <p className="text-sm text-[#4B5563]">
              This demo shows where your Fermor financial dashboard would begin. Welcome, <strong>{user?.name || fullName || "Investor"}</strong>.
            </p>
            <button
              onClick={handleExploreDashboard}
              className="w-full py-3 bg-[#111827] text-white text-sm font-semibold rounded-xl cursor-pointer hover:bg-[#059669] transition-colors shadow-md"
            >
              Explore Dashboard Preview
            </button>
          </div>
        ) : (
          /* Case 3: Form inputs for login / signup */
          <div>
            {/* Header logo & title */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#111827] text-white flex items-center justify-center font-bold text-sm font-serif">
                F
              </div>
              <span className="text-lg font-bold font-serif text-[#111827]">FERMOR</span>
            </div>

            <h3 id="auth-modal-title" className="text-2xl font-bold text-[#111827] font-serif mb-1">
              {mode === "login" ? "Welcome back" : "Make smarter money decisions"}
            </h3>
            <p className="text-xs text-[#6B7280] mb-6">
              {mode === "login"
                ? "Enter your credentials to access your saved financial plans."
                : "Join young professionals optimizing their financial future."}
            </p>

            {/* Mode switch tabs */}
            <div className="flex bg-[#FAF9F5] p-1 rounded-xl border border-[#E5E7EB] mb-6" role="tablist">
              <button
                role="tab"
                aria-selected={mode === "signup"}
                onClick={() => setMode("signup")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669] ${
                  mode === "signup" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                }`}
              >
                Create Account
              </button>
              <button
                role="tab"
                aria-selected={mode === "login"}
                onClick={() => setMode("login")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#059669] ${
                  mode === "login" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                }`}
              >
                Log In
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label htmlFor="signup-name-input" className="block text-xs font-semibold text-[#374151] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input
                      id="signup-name-input"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ashken R"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F5] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-hidden focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="auth-email-input" className="block text-xs font-semibold text-[#374151] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    id="auth-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ashken@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F5] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-hidden focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#111827] hover:bg-[#059669] text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2 focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
              >
                {mode === "login" ? "Log In to Demo Session" : "Get Started Free"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#059669]" />
              Secure & private
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
