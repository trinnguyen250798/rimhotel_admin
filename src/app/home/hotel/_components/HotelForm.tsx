"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { Amenity, Hotel, HotelFormData, HotelType } from "@/types/hotel";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Select from "@/components/form/Select";
import { fetchProvincesByCountry, fetchDistrictsByProvince } from "@/store/slices/locationSlice";
import GoongAddress from "@/components/map/goong";
import { useAppDispatch } from "@/store/hooks";
import { Country, Province, District } from "@/types/location";
import { HotelService } from "@/services/hotel.service";

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
  const [province, setProvince] = useState<Province[]>([]);
  const [district, setDistrict] = useState<District[]>([]);

  const isEdit = !!initialData?.ulid;

  const getFieldError = (fieldName: string) => {
    return errors && errors[fieldName] ? errors[fieldName][0] : undefined;
  };

  const [formData, setFormData] = useState<HotelFormData>({
    ulid: initialData?.ulid || null,

    // Required
    name: initialData?.name || "",
    address: initialData?.address || "",
    province_code: initialData?.province?.code || "",
    country_code: initialData?.country?.code || "",

    // Nullable location
    district_code: initialData?.district?.code || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",


    // General info
    star_rating: initialData?.star_rating ?? null,
    checkin_time: initialData?.checkin_time || "",
    checkout_time: initialData?.checkout_time || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    website: initialData?.website || "",
    status: initialData?.status !== undefined ? (initialData.status ? 1 : 0) : 1,

    type: initialData?.type || "",

    // Description & SEO
    short_description: initialData?.short_description || "",
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",

    // Policies
    checkin_policy: initialData?.checkin_policy || "",
    checkout_policy: initialData?.checkout_policy || "",

    // Stats
    rating_avg: initialData?.rating_avg ?? 0,
    rating_count: initialData?.rating_count ?? 0,
    price_from: initialData?.price_from ?? 0,
    price_to: initialData?.price_to ?? 0,
    total_images: initialData?.total_images ?? 0,
    booking_count: initialData?.booking_count ?? 0,
    view_count: initialData?.view_count ?? 0,

    // Flags
    is_refundable: initialData?.is_refundable ?? false,
    is_free_cancellation: initialData?.is_free_cancellation ?? false,
    is_featured: initialData?.is_featured ?? false,
    is_top_deal: initialData?.is_top_deal ?? false,

    // Arrays
    languages: initialData?.languages || [],
    payment_options: initialData?.payment_options || [],
    amenity_ids: initialData?.amenities?.map((a) => a.id) || [],
  });

  const handleChange = (name: string, value: string | number | boolean | null | string[] | number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      handleChange(name, (e.target as HTMLInputElement).checked);
    } else if (type === "number") {
      handleChange(name, value === "" ? null : Number(value));
    } else {
      handleChange(name, value);
    }
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


  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [hotelTypes, setHotelTypes] = useState<HotelType[]>([]);

  const fetchAmenities = async () => {
    try {
      const data = await HotelService.getAmenities();
      setAmenities(data);
    } catch (err) {
      console.error("Failed to fetch amenities", err);
    }
  };

  const fetchHotelTypes = async () => {
    try {
      const data = await HotelService.getTypes();
      setHotelTypes(data);
    } catch (err) {
      console.error("Failed to fetch hotel types", err);
    }
  };

  useEffect(() => {
    fetchAmenities();
    fetchHotelTypes();
  }, []);



  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* ── General Information ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Thông tin chung</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="col-span-1">
            <Label htmlFor="name">Tên khách sạn <span className="text-red-500">*</span></Label>
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
            <Label htmlFor="type">Loại khách sạn</Label>
            <Select
              id="type"
              name="type"
              options={hotelTypes.map((t) => ({ value: t.id, label: t.name }))}
              value={formData.type}
              onChange={(value) => handleChange("type", value)}
              placeholder="Chọn loại khách sạn"
              error={!!getFieldError("type")}
              hint={getFieldError("type")}
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
              value={formData.star_rating ?? ""}
              onChange={handleInputChange}
              error={!!getFieldError("star_rating")}
              hint={getFieldError("star_rating")}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!getFieldError("phone")}
              hint={getFieldError("phone")}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!getFieldError("email")}
              hint={getFieldError("email")}
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

          <div className="col-span-1">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              id="status"
              name="status"
              options={[
                { value: "1", label: "Hoạt động" },
                { value: "0", label: "Tạm dừng" },
              ]}
              value={String(formData.status)}
              onChange={(value) => handleChange("status", Number(value) as 0 | 1)}
              placeholder="Chọn trạng thái"
              error={!!getFieldError("status")}
              hint={getFieldError("status")}
            />
          </div>

        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* ── Location ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Vị trí</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <div className="col-span-1">
            <Label htmlFor="country_code">Quốc gia <span className="text-red-500">*</span></Label>
            <Select
              id="country_code"
              name="country_code"
              options={countries.map((c) => ({ value: String(c.code), label: c.name }))}
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
            <Label htmlFor="province_code">Thành phố / Tỉnh <span className="text-red-500">*</span></Label>
            <Select
              id="province_code"
              name="province_code"
              options={province.map((p) => ({ value: String(p.code), label: p.name }))}
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
              options={district.map((d) => ({ value: String(d.code), label: d.name }))}
              value={formData.district_code || ""}
              onChange={(value) => handleChange("district_code", String(value))}
              placeholder="Chọn quận / huyện"
              error={!!getFieldError("district_code")}
              hint={getFieldError("district_code")}
            />
          </div>

        </div>

        <div className="grid grid-cols-1 gap-6">

          <div>
            <Label htmlFor="address">Địa chỉ <span className="text-red-500">*</span></Label>
            <GoongAddress
              onSelect={({ address, lat, lng }) => {
                handleChange("address", address);
                handleChange("latitude", String(lat));
                handleChange("longitude", String(lng));
              }}
            />
            {getFieldError("address") && (
              <p className="mt-1 text-sm text-red-500">{getFieldError("address")}</p>
            )}
          </div>

        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="col-span-1">
            <Label htmlFor="latitude">Vĩ độ</Label>
            <Input
              id="latitude"
              name="latitude"
              placeholder="Tự động từ địa chỉ"
              value={formData.latitude}
              onChange={handleInputChange}
              hint={formData.latitude ? undefined : "Chọn địa chỉ để tự động điền"}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="longitude">Kinh độ</Label>
            <Input
              id="longitude"
              name="longitude"
              placeholder="Tự động từ địa chỉ"
              value={formData.longitude}
              onChange={handleInputChange}
            />
          </div>

        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* ── Check-in / Check-out ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Giờ nhận & trả phòng</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="col-span-1">
            <Label htmlFor="checkin_time">Giờ nhận phòng</Label>
            <Input
              type="time"
              id="checkin_time"
              name="checkin_time"
              value={formData.checkin_time}
              onChange={handleInputChange}
              error={!!getFieldError("checkin_time")}
              hint={getFieldError("checkin_time")}
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
              error={!!getFieldError("checkout_time")}
              hint={getFieldError("checkout_time")}
            />
          </div>

        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* ── Description & SEO ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Mô tả & SEO</h3>

        <div>
          <Label htmlFor="short_description">Mô tả ngắn</Label>
          <TextArea
            placeholder="Nhập mô tả ngắn về khách sạn"
            value={formData.short_description}
            onChange={(value) => handleChange("short_description", value)}
            rows={3}
            error={!!getFieldError("short_description")}
            hint={getFieldError("short_description")}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="col-span-1">
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input
              id="meta_title"
              name="meta_title"
              placeholder="Nhập meta title"
              value={formData.meta_title}
              onChange={handleInputChange}
              error={!!getFieldError("meta_title")}
              hint={getFieldError("meta_title")}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Input
              id="meta_description"
              name="meta_description"
              placeholder="Nhập meta description"
              value={formData.meta_description}
              onChange={handleInputChange}
              error={!!getFieldError("meta_description")}
              hint={getFieldError("meta_description")}
            />
          </div>

        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* ── Policies ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Chính sách</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="col-span-1">
            <Label htmlFor="checkin_policy">Chính sách nhận phòng</Label>
            <TextArea
              placeholder="Nhập chính sách nhận phòng"
              value={formData.checkin_policy}
              onChange={(value) => handleChange("checkin_policy", value)}
              rows={3}
              error={!!getFieldError("checkin_policy")}
              hint={getFieldError("checkin_policy")}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="checkout_policy">Chính sách trả phòng</Label>
            <TextArea
              placeholder="Nhập chính sách trả phòng"
              value={formData.checkout_policy}
              onChange={(value) => handleChange("checkout_policy", value)}
              rows={3}
              error={!!getFieldError("checkout_policy")}
              hint={getFieldError("checkout_policy")}
            />
          </div>

        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* ── Flags ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Tùy chọn</h3>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

          {(
            [
              { name: "is_refundable", label: "Có hoàn tiền" },
              { name: "is_free_cancellation", label: "Hủy miễn phí" },
              { name: "is_featured", label: "Nổi bật" },
              { name: "is_top_deal", label: "Top Deal" },
            ] as { name: keyof Pick<HotelFormData, "is_refundable" | "is_free_cancellation" | "is_featured" | "is_top_deal">; label: string }[]
          ).map(({ name, label }) => (
            <label key={name} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name={name}
                checked={formData[name]}
                onChange={handleInputChange}
                className="w-4 h-4 accent-brand-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}

        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* ── Amenities ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Tiện nghi</h3>
        {amenities.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">Đang tải tiện nghi...</p>
        ) : (
          <div className="space-y-5">
            {Object.entries(
              amenities.reduce<Record<string, typeof amenities>>((groups, amenity) => {
                const cat = amenity.category || "Khác";
                if (!groups[cat]) groups[cat] = [];
                groups[cat].push(amenity);
                return groups;
              }, {})
            ).map(([category, items]) => {
              const groupIds = items.map((a) => a.id);
              const allChecked = groupIds.every((id) => formData.amenity_ids.includes(id));
              return (
              <div key={category}>
                <div className="mb-2 flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {category}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const withoutGroup = formData.amenity_ids.filter((id) => !groupIds.includes(id));
                      const updated = allChecked ? withoutGroup : [...withoutGroup, ...groupIds];
                      handleChange("amenity_ids", updated);
                    }}
                    className="text-xs text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2"
                  >
                    {allChecked ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {items.map((amenity) => {
                    const checked = formData.amenity_ids.includes(amenity.id);
                    return (
                      <label
                        key={amenity.id}
                        className="flex items-center gap-2 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const updated = checked
                              ? formData.amenity_ids.filter((id) => id !== amenity.id)
                              : [...formData.amenity_ids, amenity.id];
                            handleChange("amenity_ids", updated);
                          }}
                          className="w-4 h-4 accent-brand-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {amenity.icon && <span className="mr-1"><i className={amenity.icon}></i></span>}
                          {amenity.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* ── Languages & Payment ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Ngôn ngữ & Thanh toán</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="col-span-1">
            <Label htmlFor="languages">Ngôn ngữ hỗ trợ (phân cách bằng dấu phẩy)</Label>
            <Input
              id="languages"
              name="languages"
              placeholder='vd: Vietnamese, English'
              value={formData.languages.join(", ")}
              onChange={(e) =>
                handleChange(
                  "languages",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              error={!!getFieldError("languages")}
              hint={getFieldError("languages")}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="payment_options">Phương thức thanh toán (phân cách bằng dấu phẩy)</Label>
            <Input
              id="payment_options"
              name="payment_options"
              placeholder='vd: Cash, Credit Card, Momo'
              value={formData.payment_options.join(", ")}
              onChange={(e) =>
                handleChange(
                  "payment_options",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              error={!!getFieldError("payment_options")}
              hint={getFieldError("payment_options")}
            />
          </div>

        </div>
      </div>

      <div className="flex justify-end gap-3 px-1 pt-4">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEdit ? "Đang cập nhật..." : "Đang tạo..."
            : isEdit ? "Cập nhật khách sạn" : "Thêm khách sạn"}
        </Button>
      </div>

    </form>
  );
}
