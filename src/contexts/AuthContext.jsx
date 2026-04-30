"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "qurbanihat-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const savedUser = window.localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
    } finally {
      setIsReady(true);
    }
  }, []);

  const login = (profile) => {
    const normalizedUser = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone || "",
      address: profile.address || "",
    };

    setUser(normalizedUser);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
