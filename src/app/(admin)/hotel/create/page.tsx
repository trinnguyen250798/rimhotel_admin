"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import HotelForm from "../_components/HotelForm";

export default function HotelCreatePage() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log("Create hotel", data);
  };

  return (
    <div>
      <div className="mb-6">
        <PageBreadcrumb pageTitle="Create Hotel" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <HotelForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
