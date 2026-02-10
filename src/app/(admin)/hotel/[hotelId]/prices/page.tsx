"use client";

import React, { use } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";

interface PageProps {
  params: Promise<{
    hotelId: string;
  }>;
}

export default function PricesPage({ params }: PageProps) {
  const { hotelId } = use(params);
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageTitle="Quản lý giá cả" />
        <Button>+ Thêm quy tắc giá</Button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-white">Lịch giá</h3>
        <p className="text-gray-500">Quản lý giá hàng ngày và theo mùa tại đây.</p>

        <div className="mt-6 border-t border-gray-100 pt-6 dark:border-white/[0.05]">
          <p className="italic text-gray-400">Đang triển khai thành phần lịch giá...</p>
        </div>
      </div>
    </div>
  );
}
