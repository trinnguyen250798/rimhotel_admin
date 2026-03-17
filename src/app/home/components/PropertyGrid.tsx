"use client";

import PropertyCard from "./PropertyCard";
import AddPropertyCard from "./AddPropertyCard";
import { Hotel } from "@/types/hotel";
import React, { useEffect, useState } from "react";
import { HotelService } from "@/services/hotel.service";

export default function PropertyGrid() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const fetchHotels = async () => {
    try {
      const data = await HotelService.getAll();
      setHotels(data.data);
    } catch (err) {
      console.error("Failed to fetch hotels", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <PropertyCard
          key={hotel.id}
          image=""
          rating={hotel.star}
          name={hotel.name}
          location={`${hotel.city}, ${hotel.district}`}
          tier={hotel.company_name}
          occupancy="—"
          revenue="—"
          tasks="—"
          taskHighlight={false}
        />
      ))}
      <AddPropertyCard />
    </div>
  );
}
