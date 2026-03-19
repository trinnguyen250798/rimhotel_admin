"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HotelTable from "./_components/HotelTable";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useHotels } from "@/hooks/useHotels";
import { HotelService } from "@/services/hotel.service";
import { Hotel } from "@/types/hotel";

export default function HotelListPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const { deleteHotel } = useHotels();

  const fetchHotels = async () => {
    try {
      const data = await HotelService.getAll();
      setHotels(data.data);
    } catch (err) {
      console.error("Failed to fetch hotels", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách sạn này không?")) {
      try {
        await deleteHotel(Number(id));
        fetchHotels();
      } catch (err) {
        // Error is handled in the hook
      }
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Danh sách khách sạn" />
        <Link href="/hotel/create">
          <Button>+ Thêm khách sạn</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <HotelTable hotels={hotels} onDelete={handleDelete} />
      </div>
    </div>
  );
}
