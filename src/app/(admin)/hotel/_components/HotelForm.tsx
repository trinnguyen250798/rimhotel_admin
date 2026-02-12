"use client";

import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { Hotel, HotelFormData } from "@/types/hotel";

interface HotelFormProps {
  initialData?: Partial<Hotel>;
  onSubmit: (data: HotelFormData) => void;
  isSubmitting?: boolean;
  errors?: Record<string, string[]>;
}

export default function HotelForm({ initialData, onSubmit, isSubmitting, errors }: HotelFormProps) {
  const isEdit = !!initialData?.id;

  const getFieldError = (fieldName: string) => {
    return errors && errors[fieldName] ? errors[fieldName][0] : undefined;
  };

  const [formData, setFormData] = useState<HotelFormData>({
    hotel_name: initialData?.hotel_name || "",
    city: initialData?.city || "",
    district: initialData?.district || "",
    ward: initialData?.ward || "",
    website: initialData?.website || "",
    star_rating: initialData?.star_rating || 0,
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    google_map_url: initialData?.google_map_url || "",
    distance_to_center: initialData?.distance_to_center || 0,
    company_name: initialData?.company_name || "",
    tax_code: initialData?.tax_code || "",
    license_no: initialData?.license_no || "",
    checkin_time: initialData?.checkin_time || "14:00",
    checkout_time: initialData?.checkout_time || "12:00",
    description: initialData?.description || "",
    amenities: initialData?.amenities || "",
    policies: initialData?.policies || "",
    languages: initialData?.languages || "",
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    handleChange(name, type === "number" ? Number(value) : value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* General Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Thông tin chung</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="hotel_name">Tên khách sạn</Label>
            <Input
              id="hotel_name"
              name="hotel_name"
              placeholder="Nhập tên khách sạn"
              value={formData.hotel_name}
              onChange={handleInputChange}
              error={!!getFieldError("hotel_name")}
              hint={getFieldError("hotel_name")}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="star_rating">Xếp hạng sao (0-5)</Label>
            <Input
              type="number"
              id="star_rating"
              name="star_rating"
              min="0"
              max="5"
              value={formData.star_rating}
              onChange={handleInputChange}
              error={!!getFieldError("star_rating")}
              hint={getFieldError("star_rating")}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="website">Trang web</Label>
            <Input
              id="website"
              name="website"
              placeholder="https://vi-du.com"
              value={formData.website}
              onChange={handleInputChange}
              error={!!getFieldError("website")}
              hint={getFieldError("website")}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* Location Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Vị trí</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="col-span-1">
            <Label htmlFor="city">Thành phố / Tỉnh</Label>
            <Input
              id="city"
              name="city"
              placeholder="Nhập tên thành phố"
              value={formData.city}
              onChange={handleInputChange}
              error={!!getFieldError("city")}
              hint={getFieldError("city")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="district">Quận / Huyện</Label>
            <Input
              id="district"
              name="district"
              placeholder="Nhập tên quận/huyện"
              value={formData.district}
              onChange={handleInputChange}
              error={!!getFieldError("district")}
              hint={getFieldError("district")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="ward">Phường / Xã</Label>
            <Input
              id="ward"
              name="ward"
              placeholder="Nhập tên phường/xã"
              value={formData.ward}
              onChange={handleInputChange}
              error={!!getFieldError("ward")}
              hint={getFieldError("ward")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="google_map_url">Đường dẫn Google Maps</Label>
            <Input
              id="google_map_url"
              name="google_map_url"
              placeholder="Dán liên kết Google Maps"
              value={formData.google_map_url}
              onChange={handleInputChange}
              error={!!getFieldError("google_map_url")}
              hint={getFieldError("google_map_url")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="distance_to_center">Khoảng cách đến trung tâm (km)</Label>
            <Input
              type="number"
              id="distance_to_center"
              name="distance_to_center"
              step={0.1}
              placeholder="vd: 2.5"
              value={formData.distance_to_center}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="latitude">Vĩ độ</Label>
            <Input
              id="latitude"
              name="latitude"
              placeholder="vd: 10.762622"
              value={formData.latitude}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="longitude">Kinh độ</Label>
            <Input
              id="longitude"
              name="longitude"
              placeholder="vd: 106.660172"
              value={formData.longitude}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* Legal & Contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Pháp lý & Liên hệ</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="col-span-1">
            <Label htmlFor="company_name">Tên công ty</Label>
            <Input
              id="company_name"
              name="company_name"
              placeholder="Nhập tên công ty"
              value={formData.company_name}
              onChange={handleInputChange}
              error={!!getFieldError("company_name")}
              hint={getFieldError("company_name")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="tax_code">Mã số thuế</Label>
            <Input
              id="tax_code"
              name="tax_code"
              placeholder="Nhập mã số thuế"
              value={formData.tax_code}
              onChange={handleInputChange}
              error={!!getFieldError("tax_code")}
              hint={getFieldError("tax_code")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="license_no">Số giấy phép kinh doanh</Label>
            <Input
              id="license_no"
              name="license_no"
              placeholder="Nhập số giấy phép"
              value={formData.license_no}
              onChange={handleInputChange}
              error={!!getFieldError("license_no")}
              hint={getFieldError("license_no")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="checkin_time">Giờ nhận phòng</Label>
            <Input
              type="time"
              id="checkin_time"
              name="checkin_time"
              value={formData.checkin_time}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="checkout_time">Giờ trả phòng</Label>
            <Input
              type="time"
              id="checkout_time"
              name="checkout_time"
              value={formData.checkout_time}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* Content & Policies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Nội dung & Chính sách</h3>
        <div>
          <Label htmlFor="description">Mô tả</Label>
          <TextArea
            placeholder="Nhập mô tả về khách sạn"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            rows={4}
            error={!!getFieldError("description")}
            hint={getFieldError("description")}
          />
        </div>
        <div>
          <Label htmlFor="policies">Chính sách</Label>
          <TextArea
            placeholder="Nhập các chính sách của khách sạn"
            value={formData.policies}
            onChange={(value) => handleChange("policies", value)}
            rows={4}
            error={!!getFieldError("policies")}
            hint={getFieldError("policies")}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="amenities">Tiện nghi (Chuỗi JSON hoặc phân tách bằng dấu phẩy)</Label>
            <TextArea
              placeholder='vd: ["Wifi", "Pool", "Parking"]'
              value={formData.amenities}
              onChange={(value) => handleChange("amenities", value)}
              rows={2}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="languages">Ngôn ngữ (Chuỗi JSON hoặc phân tách bằng dấu phẩy)</Label>
            <TextArea
              placeholder='vd: ["Vietnamese", "English"]'
              value={formData.languages}
              onChange={(value) => handleChange("languages", value)}
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 px-1 pt-4">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (isEdit ? "Đang cập nhật..." : "Đang tạo...") : (isEdit ? "Cập nhật khách sạn" : "Thêm khách sạn")}
        </Button>
      </div>
    </form>
  );
}
