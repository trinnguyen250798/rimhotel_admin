"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import HotelForm from "../_components/HotelForm";
import { useHotels } from "@/hooks/useHotels";
import { useRouter } from "next/navigation";
import { HotelFormData } from "@/types/hotel";

export default function HotelCreatePage() {
  const { createHotel, loading } = useHotels();
  const router = useRouter();

  const handleSubmit = async (data: HotelFormData) => {
    try {
      await createHotel(data);
      router.push("/hotel");
    } catch (err) {
      // Error is handled in the hook
    }
  };

  return (
    <div>
      <div className="mb-6">
        <PageBreadcrumb pageTitle="Create Hotel" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <HotelForm onSubmit={handleSubmit} isSubmitting={loading} />
      </div>
    </div>
  );
}
