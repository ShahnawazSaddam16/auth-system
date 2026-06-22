"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_ORIGIN}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.user);
        return true;
      }

      setUser(null);
      return false;
    } catch (err) {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(
    async (opts = { redirect: true }) => {
      try {
        await fetch(`${API_ORIGIN}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        // ignore
      }

      setUser(null);
      if (opts.redirect) router.push("/");
    },
    [router]
  );

  const setUserData = useCallback((u) => {
    setUser(u);
    setLoading(false);
  }, []);

  const userData = useCallback(() => user, [user]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <AuthContext.Provider value={{ user, loading, checkUser, logout, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
