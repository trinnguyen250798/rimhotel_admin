"use client";

import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

interface HotelData {
  name: string;
  address: string;
  description: string;
  starRating: number;
  status: string;
}

interface HotelFormProps {
  initialData?: HotelData;
  onSubmit: (data: HotelData) => void;
  isSubmitting?: boolean;
}

export default function HotelForm({ initialData, onSubmit, isSubmitting }: HotelFormProps) {
  const [formData, setFormData] = useState<HotelData>(
    initialData || {
      name: "",
      address: "",
      description: "",
      starRating: 3,
      status: "Active",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "starRating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="col-span-1">
          <Label htmlFor="name">Hotel Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter hotel name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        {/* Assuming TextArea component usage */}
        <div className="relative">
            <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="starRating">Star Rating</Label>
            <Input
              type="number"
              id="starRating"
              name="starRating"
              min="1"
              max="5"
              value={formData.starRating}
              onChange={handleChange}
            />
          </div>
          
          <div className="col-span-1">
            <Label htmlFor="status">Status</Label>
            <div className="relative">
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
          </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Hotel"}
        </Button>
      </div>
    </form>
  );
}
