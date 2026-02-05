"use client";

import React from "react";
import Link from "next/link";
import HotelTable from "./_components/HotelTable";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function HotelListPage() {
  // Mock data for now
  const hotels = [
    {
      id: "1",
      name: "Rim Hotel Da Nang",
      address: "123 Bien, Da Nang",
      starRating: 4,
      status: "Active" as "Active" | "Inactive",
      imageUrl: "",
    },
    {
      id: "2",
      name: "Rim Hotel Ha Noi",
      address: "456 Pho Hue, Ha Noi",
      starRating: 5,
      status: "Active" as "Active" | "Inactive",
      imageUrl: "",
    },
  ];

  const handleDelete = (id: string) => {
    console.log("Delete hotel", id);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Hotels" />
        <Link href="/hotel/create">
          <Button>+ Add Hotel</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <HotelTable hotels={hotels} onDelete={handleDelete} />
      </div>
    </div>
  );
}
