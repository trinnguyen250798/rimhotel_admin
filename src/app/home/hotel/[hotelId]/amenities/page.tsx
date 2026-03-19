"use client";

import React, { use } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";

interface PageProps {
  params: Promise<{
    hotelId: string;
  }>;
}

export default function AmenitiesPage({ params }: PageProps) {
  const { hotelId } = use(params);
  const amenities = [
    "WiFi", "Pool", "Gym", "Spa", "Parking", "Restaurant", "Bar", "AC"
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Tiện nghi khách sạn" />
        <Button>Lưu thay đổi</Button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">Chọn tiện nghi</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {amenities.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.03]">
              <input type="checkbox" id={item} className="h-5 w-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
              <Label htmlFor={item} className="mb-0 cursor-pointer">{item}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
