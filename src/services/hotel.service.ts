import axiosClient from "@/lib/axios";
import { Hotel, HotelFormData, HotelResponse } from "@/types/hotel";

export const HotelService = {
  getAll: async (): Promise<HotelResponse> => {
    const response = await axiosClient.get("/hotels");
    return response.data;
  },
  getById: async (id: number): Promise<Hotel> => {
    const response = await axiosClient.get(`/hotels/${id}`);
    return response.data;
  },
  create: async (data: HotelFormData): Promise<Hotel> => {
    const response = await axiosClient.post("/hotels", data);
    return response.data;
  },
  update: async (id: number, data: Partial<HotelFormData>): Promise<Hotel> => {
    const response = await axiosClient.put(`/hotels/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/hotels/${id}`);
  },
};
