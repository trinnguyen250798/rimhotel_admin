import axiosClient from "@/lib/axios";
import { Hotel, HotelFormData, HotelResponse } from "@/types/hotel";

export const HotelService = {
  getAll: async (): Promise<HotelResponse> => {
    const response = await axiosClient.get("/admin/hotels");
    return response.data;
  },
  getById: async (id: number): Promise<Hotel> => {
    const response = await axiosClient.get(`/admin/hotels/${id}`);
    return response.data;
  },
  create: async (data: HotelFormData): Promise<Hotel> => {
    const response = await axiosClient.post("/admin/hotels", data);
    return response.data;
  },
  update: async (id: number, data: Partial<HotelFormData>): Promise<Hotel> => {
    const response = await axiosClient.put(`/admin/hotels/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/admin/hotels/${id}`);
  },
};
