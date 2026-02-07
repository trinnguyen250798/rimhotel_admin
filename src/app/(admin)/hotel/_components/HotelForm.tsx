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
}

export default function HotelForm({ initialData, onSubmit, isSubmitting }: HotelFormProps) {
  const isEdit = !!initialData?.id;

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
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">General Information</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="hotel_name">Hotel Name</Label>
            <Input
              id="hotel_name"
              name="hotel_name"
              placeholder="Enter hotel name"
              value={formData.hotel_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="star_rating">Star Rating (0-5)</Label>
            <Input
              type="number"
              id="star_rating"
              name="star_rating"
              min="0"
              max="5"
              value={formData.star_rating}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-1">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              placeholder="https://example.com"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* Location Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Location</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="col-span-1">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              name="district"
              placeholder="Enter district"
              value={formData.district}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="ward">Ward</Label>
            <Input
              id="ward"
              name="ward"
              placeholder="Enter ward"
              value={formData.ward}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="google_map_url">Google Maps URL</Label>
            <Input
              id="google_map_url"
              name="google_map_url"
              placeholder="Paste Google Maps link"
              value={formData.google_map_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="distance_to_center">Distance to Center (km)</Label>
            <Input
              type="number"
              id="distance_to_center"
              name="distance_to_center"
              step={0.1}
              placeholder="e.g. 2.5"
              value={formData.distance_to_center}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              name="latitude"
              placeholder="e.g. 10.762622"
              value={formData.latitude}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              name="longitude"
              placeholder="e.g. 106.660172"
              value={formData.longitude}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-white/[0.05]" />

      {/* Legal & Contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Legal & Contact</h3>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="col-span-1">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              name="company_name"
              placeholder="Enter company name"
              value={formData.company_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="tax_code">Tax Code</Label>
            <Input
              id="tax_code"
              name="tax_code"
              placeholder="Enter tax code"
              value={formData.tax_code}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="license_no">License No</Label>
            <Input
              id="license_no"
              name="license_no"
              placeholder="Enter license no"
              value={formData.license_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="checkin_time">Check-in Time</Label>
            <Input
              type="time"
              id="checkin_time"
              name="checkin_time"
              value={formData.checkin_time}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="checkout_time">Check-out Time</Label>
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
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Content & Policies</h3>
        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea
            placeholder="Enter hotel description"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="policies">Policies</Label>
          <TextArea
            placeholder="Enter hotel policies"
            value={formData.policies}
            onChange={(value) => handleChange("policies", value)}
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="amenities">Amenities (JSON string or comma-separated)</Label>
            <TextArea
              placeholder='e.g. ["Wifi", "Pool", "Parking"]'
              value={formData.amenities}
              onChange={(value) => handleChange("amenities", value)}
              rows={2}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="languages">Languages (JSON string or comma-separated)</Label>
            <TextArea
              placeholder='e.g. ["Vietnamese", "English"]'
              value={formData.languages}
              onChange={(value) => handleChange("languages", value)}
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 px-1 pt-4">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Hotel" : "Create Hotel")}
        </Button>
      </div>
    </form>
  );
}
