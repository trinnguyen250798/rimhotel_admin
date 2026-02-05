"use client";

import React, { use } from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RoomTable from "../../_components/RoomTable";

interface PageProps {
  params: Promise<{
    hotelId: string;
  }>;
}

export default function RoomListPage({ params }: PageProps) {
  const { hotelId } = use(params);
  // Mock data
  const rooms = [
    {
      id: "101",
      name: "101",
      type: "Standard",
      price: 150,
      status: "Available" as "Available" | "Booked" | "Maintenance",
    },
    {
      id: "201",
      name: "201",
      type: "Deluxe",
      price: 250,
      status: "Booked" as "Available" | "Booked" | "Maintenance",
    },
  ];

  const handleDelete = (id: string) => {
    console.log("Delete room", id);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Hotel Rooms" />
        <Link href={`/hotel/${hotelId}/rooms/create`}>
          <Button>+ Add Room</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <RoomTable rooms={rooms} hotelId={hotelId} onDelete={handleDelete} />
      </div>
    </div>
  );
}
