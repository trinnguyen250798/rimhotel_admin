"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";



export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <SidebarProvider>
            {/* 👇 chỉ delay children, không delay Provider */}
            {mounted ? children : null}
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}