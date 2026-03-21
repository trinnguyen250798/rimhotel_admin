"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { Hotel, HotelFormData } from "@/types/hotel";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Select from "@/components/form/Select";
import ReactSelect from "react-select"; 
import { fetchProvincesByCountry, fetchDistrictsByProvince } from "@/store/slices/locationSlice";
import { useAppDispatch } from "@/store/hooks";
import { Country, Province, District } from "@/types/location";
// import AddressAutocomplete from "@/components/map/locationiq";

interface HotelFormProps {
  initialData?: Partial<Hotel>;
  onSubmit: (data: HotelFormData) => void;
  isSubmitting?: boolean;
  errors?: Record<string, string[]>;
}


export default function HotelForm({ initialData, onSubmit, isSubmitting, errors }: HotelFormProps) {
    const dispatch = useAppDispatch();
    const countries = useSelector((state: RootState) => state.location.countries);
    const provincesState = useSelector((state: RootState) => state.location.provinces);
    const districtsState = useSelector((state: RootState) => state.location.districts);
    const [country, setCountry] = useState<Country[]>([]);
    const [province, setProvince] = useState<Province[]>([]);
    const [district, setDistrict] = useState<District[]>([]);


  const isEdit = !!initialData?.ulid;

  const getFieldError = (fieldName: string) => {
    return errors && errors[fieldName] ? errors[fieldName][0] : undefined;
  };

  const [formData, setFormData] = useState<HotelFormData>({
    ulid: initialData?.ulid || null,
    name: initialData?.name || "",
    description: initialData?.description || "",
    address: initialData?.address?.address || "",
    district_code: initialData?.address?.district?.code || "",
    province_code: initialData?.address?.province?.code || "",
    country_code: initialData?.address?.country?.code || "",
    latitude: initialData?.location?.lat || "",
    longitude: initialData?.location?.lng || "",
    star_rating: initialData?.star_rating || 0,
    checkin_time: initialData?.checkin_time || "",
    checkout_time: initialData?.checkout_time || "",
    phone: initialData?.contact?.phone || "",
    email: initialData?.contact?.email || "",
    website: initialData?.contact?.website || "",
    status: initialData?.status || 1,
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

  useEffect(() => {
    if (formData.country_code) {
      const data = provincesState[formData.country_code];
      if (data) {
        setProvince(data);
      } else {
        dispatch(fetchProvincesByCountry(formData.country_code));
      }
    } else {
      setProvince([]);
    }
  }, [formData.country_code, provincesState, dispatch]);

  useEffect(() => {
    if (formData.province_code) {
      const data = districtsState[formData.province_code];
      if (data) {
        setDistrict(data);
      } else {
        dispatch(fetchDistrictsByProvince(formData.province_code));
      }
    } else {
      setDistrict([]);
    }
  }, [formData.province_code, districtsState, dispatch]);


  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* General Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Thông tin chung</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="name">Tên khách sạn</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nhập tên khách sạn"
              value={formData.name}
              onChange={handleInputChange}
              error={!!getFieldError("name")}
              hint={getFieldError("name")}
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
            <Label htmlFor="country_code">Quốc gia</Label>
           <Select
                id="country_code"
                name="country_code"
                options={countries.map((country) => ({
                    value: String(country.code),
                    label: country.name,
                }))}
                value={formData.country_code || ""}
                onChange={(value) => {
                    handleChange("country_code", String(value));
                    handleChange("province_code", "");
                    handleChange("district_code", "");
                }}
                placeholder="Chọn quốc gia"
                error={!!getFieldError("country_code")}
                hint={getFieldError("country_code")}
                />
          </div>
          <div className="col-span-1">
            <Label htmlFor="province_code">Thành phố / Tỉnh</Label>
             <Select
              id="province_code"
              name="province_code"
              options={province.map((p) => ({
                value: String(p.code),
                label: p.name,   
              }))}
              value={formData.province_code || ""}
              onChange={(value) => {
                handleChange("province_code", String(value));
                handleChange("district_code", "");
              }}
              placeholder="Chọn thành phố / tỉnh"
              error={!!getFieldError("province_code")}
              hint={getFieldError("province_code")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="district_code">Quận / Huyện</Label>
            <Select
              id="district_code"
              name="district_code"
              options={district.map((d) => ({
                value: String(d.code),
                label: d.name,   
              }))}
              value={formData.district_code || ""}
              onChange={(value) => {
                  handleChange("district_code", String(value));
              }}
              placeholder="Chọn quận / huyện"
              error={!!getFieldError("district_code")}
              hint={getFieldError("district_code")}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              name="address"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={handleInputChange}
              error={!!getFieldError("address")}
              hint={getFieldError("address")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* <AddressAutocomplete
  onSelect={({ address, lat, lng }) => {
    handleChange("address", address);
    handleChange("latitude", String(lat));
    handleChange("longitude", String(lng));
  }}
/> */}
          <div className="col-span-1">
            <Label htmlFor="google_map_url">Đường dẫn Google Maps</Label>
            <Input
              id="google_map_url"
              name="google_map_url"
              placeholder="Dán liên kết Google Maps"
              value=""
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
              value=""
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
              value=""
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
              value=""
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
              value=""
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
            value=""
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
              value=""
              onChange={(value) => handleChange("amenities", value)}
              rows={2}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="languages">Ngôn ngữ (Chuỗi JSON hoặc phân tách bằng dấu phẩy)</Label>
            <TextArea
              placeholder='vd: ["Vietnamese", "English"]'
              value=""
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
