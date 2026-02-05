"use client";

import React, { use } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import HotelForm from "../_components/HotelForm";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    hotelId: string;
  }>;
}

export default function HotelDetailsPage({ params }: PageProps) {
  const { hotelId } = use(params);
  // Mock fetching data
  const initialData = {
    name: "Rim Hotel Da Nang",
    address: "123 Bien, Da Nang",
    description: "A beautiful hotel near the beach.",
    starRating: 4,
    status: "Active",
  };

  const handleSubmit = (data: Record<string, any>) => {
    console.log("Update hotel", data);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Hotel Details" />
        <div className="flex gap-2">
            <Link href={`/hotel/${hotelId}/rooms`} className="inline-flex items-center justify-center rounded-lg bg-primary/[0.1] px-4 py-2 text-sm font-medium text-primary hover:bg-primary/[0.2]">
                Manage Rooms
            </Link>
             <Link href={`/hotel/${hotelId}/prices`} className="inline-flex items-center justify-center rounded-lg bg-primary/[0.1] px-4 py-2 text-sm font-medium text-primary hover:bg-primary/[0.2]">
                Prices
            </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <HotelForm initialData={initialData} onSubmit={handleSubmit} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link href={`/hotel/${hotelId}/images`} className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-lg dark:border-white/[0.05] dark:bg-white/[0.03]">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Images</h3>
            <p className="text-sm text-gray-500">Manage hotel gallery</p>
          </Link>
          <Link href={`/hotel/${hotelId}/amenities`} className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-lg dark:border-white/[0.05] dark:bg-white/[0.03]">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Amenities</h3>
            <p className="text-sm text-gray-500">Manage hotel amenities</p>
          </Link>
      </div>
    </div>
  );
}
