"use client";

import React, { use, useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import HotelForm from "../_components/HotelForm";
import Link from "next/link";
import { useHotels } from "@/hooks/useHotels";
import { HotelService } from "@/services/hotel.service";
import { Hotel, HotelFormData } from "@/types/hotel";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{
    hotelId: string;
  }>;
}

export default function HotelDetailsPage({ params }: PageProps) {
  const { hotelId } = use(params);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const { updateHotel, loading } = useHotels();
  const router = useRouter();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await HotelService.getById(Number(hotelId));
        setHotel(data);
      } catch (err) {
        console.error("Failed to fetch hotel", err);
      }
    };
    fetchHotel();
  }, [hotelId]);

  const handleSubmit = async (data: HotelFormData) => {
    try {
      await updateHotel(Number(hotelId), data);
      router.push("/hotel");
    } catch (err) {
      // Error is handled in the hook
    }
  };

  if (!hotel) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-gray-500">Đang tải thông tin khách sạn...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Chi tiết khách sạn" />
        <div className="flex gap-2">
          <Link href={`/hotel/${hotelId}/rooms`} className="inline-flex items-center justify-center rounded-lg bg-primary/[0.1] px-4 py-2 text-sm font-medium text-primary hover:bg-primary/[0.2]">
            Quản lý phòng
          </Link>
          <Link href={`/hotel/${hotelId}/prices`} className="inline-flex items-center justify-center rounded-lg bg-primary/[0.1] px-4 py-2 text-sm font-medium text-primary hover:bg-primary/[0.2]">
            Giá cả
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <HotelForm initialData={hotel} onSubmit={handleSubmit} isSubmitting={loading} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href={`/hotel/${hotelId}/images`} className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-lg dark:border-white/[0.05] dark:bg-white/[0.03]">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Hình ảnh</h3>
          <p className="text-sm text-gray-500">Quản lý album ảnh khách sạn</p>
        </Link>
        <Link href={`/hotel/${hotelId}/amenities`} className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-lg dark:border-white/[0.05] dark:bg-white/[0.03]">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Tiện nghi</h3>
          <p className="text-sm text-gray-500">Quản lý các tiện nghi của khách sạn</p>
        </Link>
      </div>
    </div>
  );
}
