"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";
import { log } from "console";
import { useEffect } from "react";
import { fetchCountries, fetchProvincesByCountry } from "@/store/slices/locationSlice";
import { useAppDispatch } from "@/store/hooks";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User, remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchProvincesByCountry('VN'));
  }, []);
  const router = useRouter();

  // Load user từ storage khi F5
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;

    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    }

    return null;
  });

  // Check token khi load app
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;

    return !!(
      localStorage.getItem("token") || sessionStorage.getItem("token")
    );
  });

  const [isLoading] = useState(false);

  const login = (token: string, userData: User, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("token", token);
    storage.setItem("user", JSON.stringify(userData));
    console.log(token);
    document.cookie = `token=${token}; path=/`;

    setUser(userData);
    setIsAuthenticated(true);

    router.replace("/home");
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    setUser(null);
    setIsAuthenticated(false);

    router.replace("/signin");
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