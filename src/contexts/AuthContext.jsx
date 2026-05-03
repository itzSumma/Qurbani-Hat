"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";

const AuthContext = createContext(null);
const STORAGE_KEY = "qurbanihat-user";

export function AuthProvider({ children }) {
  const session = useSession();
  const [localUser, setLocalUser] = useState(null);
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    try {
      const savedUser = window.localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalUser(JSON.parse(savedUser));
      }
    } catch {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
    } finally {
      setIsStorageReady(true);
    }
  }, []);

  const sessionUser = session.data?.user ?? session.data?.session?.user ?? null;

  const user = useMemo(() => {
    if (sessionUser) {
      return {
        id: sessionUser.id,
        name: sessionUser.name || "",
        email: sessionUser.email || "",
        phone: sessionUser.phone || "",
        address: sessionUser.address || "",
        image: sessionUser.image || "",
      };
    }

    return localUser;
  }, [sessionUser, localUser]);

  useEffect(() => {
    if (!isStorageReady) return;

    try {
      if (user) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }, [user, isStorageReady]);

  const login = (profile) => {
    const normalizedUser = {
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      image: profile.image || "",
    };

    setLocalUser(normalizedUser);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedUser));
    } catch {}
  };

  const updateProfile = (profile) => {
    const normalizedUser = {
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      image: profile.image || "",
    };

    setLocalUser(normalizedUser);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedUser));
    } catch {}
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {}

    setLocalUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}

    session.refetch?.();
  };

  const isReady = isStorageReady && !session.isPending;
  const hasSession = Boolean(sessionUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        isReady,
        login,
        logout,
        updateProfile,
        hasSession,
        refetchSession: session.refetch,
      }}>
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
