"use client";

import React, { use } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RoomForm from "../../../_components/RoomForm";

interface PageProps {
  params: Promise<{
    hotelId: string;
    roomId: string;
  }>;
}

export default function RoomDetailsPage({ params }: PageProps) {
  const { hotelId, roomId } = use(params);
  // Mock fetching data
  const initialData = {
    name: "101",
    type: "Standard",
    price: 150,
    capacity: 2,
    status: "Available",
  };

  const handleSubmit = (data: Record<string, any>) => {
    console.log("Update room", data);
  };

  return (
    <div>
      <div className="mb-6">
        <PageBreadcrumb pageTitle="Room Details" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <RoomForm initialData={initialData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
