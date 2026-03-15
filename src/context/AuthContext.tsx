"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User, remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // Read user from whichever storage has it
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (token) {
      // Token is enough to consider the session valid.
      // User data is a bonus — restore it if available.
      setIsAuthenticated(true);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // Corrupted user JSON — clear it but keep the session alive.
          localStorage.removeItem("user");
          sessionStorage.removeItem("user");
        }
      }
    }

    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("token", token);
    storage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
    router.push("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};