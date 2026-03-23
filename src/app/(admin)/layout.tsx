"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState } from "react";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { HotelService } from "@/services/hotel.service";
import { useAppDispatch } from "@/store/hooks";
import { setHotelCurrent } from "@/store/slices/hotelSlice";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storedUser =
    typeof window !== "undefined" &&
    (localStorage.getItem("user") || sessionStorage.getItem("user"));

  const token =
    typeof window !== "undefined" &&
    (localStorage.getItem("token") || sessionStorage.getItem("token"));

  const user = storedUser ? JSON.parse(storedUser) : null;

  const hotelCurrent = useSelector(
    (state: RootState) => state.hotelCurrent.hotelCurrent
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!user || !token) {
        router.push("/signin");
        return;
      }
      if (!hotelCurrent) {
        const hotelIdCurrent = localStorage.getItem("hotelIdCurrent");
        if (!hotelIdCurrent) {
          router.push("/home");
          return;
        }
        try {
          const data = await HotelService.getById(hotelIdCurrent);
          dispatch(setHotelCurrent(data));
        } catch (err) {
          console.error("Failed to fetch hotel", err);
        }
      }
      setLoading(false);
    };
    init();
  }, [user, token, hotelCurrent]);
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto md:p-6">{children}</div>
      </div>
    </div>
  );
}