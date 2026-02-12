import { useState } from "react";
import { HotelService } from "@/services/hotel.service";
import { Hotel, HotelFormData } from "@/types/hotel";

export const useHotels = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState<string | null>(null);

  const createHotel = async (data: HotelFormData) => {
    setLoading(true);
    setError(null);
    setValidationErrors({});
    setSuccess(null);
    try {
      const response = await HotelService.create(data);
      setSuccess("Khách sạn đã được tạo thành công!");
      return response;
    } catch (err: any) {
      if (err.response?.status === 422) {
        setValidationErrors(err.response.data.errors || {});
        setError(err.response.data.message || "Dữ liệu không hợp lệ.");
      } else {
        setError(err.response?.data?.message || "Không thể tạo khách sạn.");
      }
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
    validationErrors,
    success,
    createHotel,
    updateHotel,
    deleteHotel,
  };
};
