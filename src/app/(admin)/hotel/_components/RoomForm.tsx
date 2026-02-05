"use client";

import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

interface RoomData {
  name: string;
  type: string;
  price: number;
  capacity: number;
  status: string;
}

interface RoomFormProps {
  initialData?: RoomData;
  onSubmit: (data: RoomData) => void;
  isSubmitting?: boolean;
}

export default function RoomForm({ initialData, onSubmit, isSubmitting }: RoomFormProps) {
  const [formData, setFormData] = useState<RoomData>(
    initialData || {
      name: "",
      type: "Standard",
      price: 100,
      capacity: 2,
      status: "Available",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "capacity" ? Number(value) : value,
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
          <Label htmlFor="name">Room Name/Number</Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g. 101, Suite A"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="type">Room Type</Label>
          <div className="relative">
            <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
            >
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
            </select>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="price">Base Price ($)</Label>
            <Input
              type="number"
              id="price"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          
          <div className="col-span-1">
            <Label htmlFor="capacity">Capacity (Persons)</Label>
            <Input
                type="number"
                id="capacity"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
            />
          </div>
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
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
            </div>
          </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Room"}
        </Button>
      </div>
    </form>
  );
}
