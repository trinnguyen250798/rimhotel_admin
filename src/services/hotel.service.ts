import axiosClient from "@/lib/axios";
import { Hotel, HotelFormData, HotelResponse, HotelType, Amenity } from "@/types/hotel";

export const HotelService = {
  getAll: async (): Promise<HotelResponse> => {
    const response = await axiosClient.get("/admin/hotels");

    return response.data;
  },
  getById: async (id: string | number): Promise<Hotel> => {
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

  getTypes: async (): Promise<HotelType[]> => {
    const response = await axiosClient.get("/type-hotel");
    return response.data.data;
  },

  getAmenities: async (): Promise<Amenity[]> => {
    const response = await axiosClient.get("/amenities");
    return response.data.data;
  },
};
