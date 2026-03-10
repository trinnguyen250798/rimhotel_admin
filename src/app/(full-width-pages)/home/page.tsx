"use client";

import HotelCard from "@/components/hotel/HotelCard";
import { HotelService } from "@/services/hotel.service";
import { Hotel } from "@/types/hotel";
import { useEffect, useState } from "react";

export default function HotelPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const fetchHotels = async () => {
    try {
      const res = await HotelService.getAll();
      setHotels(res.data);
    } catch (err) {
      console.error("Failed to fetch hotels", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">
              Property Selection
            </h1>
            <p className="text-slate-500 text-lg">
              Select a hotel to manage its operations
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <input
            className="w-full pl-4 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            placeholder="Search properties..."
          />
        </div>
      </div>

      {/* Grid Hotel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}

        {/* Add new hotel */}
        <button className="group relative flex flex-col items-center justify-center p-8 bg-transparent border-2 border-dashed border-slate-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 min-h-[440px]">
          <div className="w-20 h-20 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors mb-4">
            <span className="material-symbols-outlined text-4xl">add</span>
          </div>

          <h3 className="text-xl font-bold mb-2">
            Register New Property
          </h3>

          <p className="text-slate-500 text-center max-w-[200px]">
            Expand your portfolio and add a new hotel.
          </p>
        </button>
      </div>
    </main>
  );
}