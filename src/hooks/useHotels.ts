import { useState } from "react";
import { HotelService } from "@/services/hotel.service";
import { Hotel, HotelFormData } from "@/types/hotel";

export const useHotels = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createHotel = async (data: HotelFormData) => {
    setLoading(true);
    setError(null);
    try {
      const hotel = await HotelService.create(data);
      return hotel;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create hotel");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateHotel = async (id: number, data: Partial<HotelFormData>) => {
    setLoading(true);
    setError(null);
    try {
      const hotel = await HotelService.update(id, data);
      return hotel;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update hotel");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteHotel = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await HotelService.delete(id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete hotel");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createHotel,
    updateHotel,
    deleteHotel,
  };
};
