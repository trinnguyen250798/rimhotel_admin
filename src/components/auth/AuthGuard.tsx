"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/signin");
      }
      setIsChecking(false);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isChecking) {
    // You can replace this with a proper loading spinner
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-dashed rounded-full animate-spin"></div>
             <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  // Prevent rendering children if not authenticated (extra safety during redirect)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
