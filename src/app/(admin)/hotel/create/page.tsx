"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import HotelForm from "../_components/HotelForm";
import { useHotels } from "@/hooks/useHotels";
import { useRouter } from "next/navigation";
import { HotelFormData } from "@/types/hotel";
import Alert from "@/components/ui/alert/Alert";

export default function HotelCreatePage() {
  const { createHotel, loading, error, validationErrors, success } = useHotels();
  const router = useRouter();

  const handleSubmit = async (data: HotelFormData) => {
    try {
      await createHotel(data);
      // Wait a bit to show success message before redirecting
      setTimeout(() => {
        router.push("/hotel");
      }, 2000);
    } catch (err) {
      // Error is handled in the hook
    }
  };

  return (
    <div>
      <div className="mb-6">
        <PageBreadcrumb pageTitle="Tạo khách sạn" />
      </div>

      <div className="mb-6 space-y-4">
        {success && (
          <Alert variant="success" title="Thành công" message={success} />
        )}
        {error && !Object.keys(validationErrors).length && (
          <Alert variant="error" title="Lỗi" message={error} />
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <HotelForm
          onSubmit={handleSubmit}
          isSubmitting={loading}
          errors={validationErrors}
        />
      </div>
    </div>
  );
}
