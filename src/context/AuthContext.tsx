"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";

export interface DemoUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: DemoUser | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const STORAGE_KEY = "fermor_demo_session";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();
  const [user, setUser] = useState<DemoUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          return {
            name: parsed.name || parsed.email.split("@")[0],
            email: parsed.email,
          };
        }
      }
    } catch {
      // Ignore storage read errors during initialization
    }
    return null;
  });

  const login = (email: string, name?: string) => {
    const formattedName = name?.trim() || email.split("@")[0] || "User";
    const newUser = { name: formattedName, email };
    setUser(newUser);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isAuthenticated: true,
          name: formattedName,
          email,
        })
      );
    } catch {
      // Ignore storage write errors
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage delete errors
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isClient && !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
