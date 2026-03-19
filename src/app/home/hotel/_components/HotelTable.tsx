"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button/Button"; // Fixed: default import

import { Hotel } from "@/types/hotel";

interface HotelTableProps {
  hotels: Hotel[];
  onDelete: (id: string) => void;
}

export default function HotelTable({ hotels, onDelete }: HotelTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tên khách sạn
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Địa chỉ
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Xếp hạng
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Trạng thái
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHeader>
            {hotels.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-white/[0.05]">
                        <svg
                          className="w-8 h-8 text-gray-400 dark:text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div className="max-w-[320px] mx-auto">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                          Không tìm thấy khách sạn
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Có vẻ như danh sách khách sạn của bạn đang trống. Hãy bắt đầu bằng cách thêm khách sạn đầu tiên của bạn.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full relative">
                          <Image
                            fill
                            src="/images/hotel/placeholder.jpg"
                            alt={hotel.hotel_name}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {hotel.hotel_name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {`${hotel.ward}, ${hotel.district}, ${hotel.city}`}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {hotel.star_rating} Sao
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color="success"
                      >
                        Hoạt động
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Link href={`/hotel/${hotel.id}`} className="text-primary hover:underline">
                          Sửa
                        </Link>
                        <button
                          onClick={() => onDelete(String(hotel.id))}
                          className="text-error hover:underline text-red-500"
                        >
                          Xóa
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            )}

          </Table>
        </div>
      </div>
    </div>
  );
}
