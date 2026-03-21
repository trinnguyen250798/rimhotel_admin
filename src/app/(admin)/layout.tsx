"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState } from "react";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();

  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const user = storedUser ? JSON.parse(storedUser) : null;
  const hotelCurrent = useSelector(
    (state: RootState) => state.hotelCurrent.hotelCurrent
  );

  const [checkRole, setCheckRole] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      setCheckRole(true);
      return;
    }

    if (!hotelCurrent) {
      setCheckRole(true);
      return;
    }

    setCheckRole(false);
  }, [user, token, hotelCurrent]);

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />

        {checkRole ? (<>
          <div className="p-4 mx-auto md:p-6">
            🚫 Không có quyền truy cập
          </div>
          <div className="p-4 mx-auto md:p-6">
            <button onClick={() => router.push("/signin")}>Đăng nhập</button>
          </div>
        </>
        ) : (
          <div className="p-4 mx-auto md:p-6">{children}</div>
        )}
      </div>
    </div>
  );
}