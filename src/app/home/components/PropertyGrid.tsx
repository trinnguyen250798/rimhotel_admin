"use client";

import PropertyCard from "./PropertyCard";
import AddPropertyCard from "./AddPropertyCard";
import { Hotel, HotelResponse } from "@/types/hotel";
import React, { useEffect, useState } from "react";
import { HotelService } from "@/services/hotel.service";

export default function PropertyGrid() {
  const [hotels, setHotels] = useState<HotelResponse | null>(null);

  const fetchHotels = async () => {
    try {
      const data = await HotelService.getAll();
      setHotels(data);
    } catch (err) {
      console.error("Failed to fetch hotels", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels?.data.map((hotel) => (
        <PropertyCard
          hotel={hotel}
          key={hotel.id}
        />
      ))}
      <AddPropertyCard />
    </div>
  );
}
