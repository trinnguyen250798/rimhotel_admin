"use client";

import React, { use } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    hotelId: string;
  }>;
}

export default function ImagesPage({ params }: PageProps) {
  const { hotelId } = use(params);
  // Mock images
  const images = ["/images/hotel/hotel-1.jpg", "/images/hotel/hotel-2.jpg"];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Hình ảnh khách sạn" />
        <Button>+ Tải ảnh lên</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-white/[0.05] dark:bg-white/[0.03]">
            {/* Placeholder for actual image if source existed */}
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              Ảnh {idx + 1}
            </div>
          </div>
        ))}
        <div className="relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
          <span className="text-3xl text-gray-400">+</span>
          <span className="mt-2 text-sm text-gray-500">Tải ảnh mới</span>
        </div>
      </div>
    </div>
  );
}
