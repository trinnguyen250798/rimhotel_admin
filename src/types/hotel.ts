export interface Hotel {
  id: number;
  hotel_name: string;
  city: string;
  district: string;
  ward: string;
  website: string;
  star_rating: number;
  latitude: string;
  longitude: string;
  google_map_url: string;
  distance_to_center: number;
  company_name: string;
  tax_code: string;
  license_no: string;
  checkin_time: string;
  checkout_time: string;
  description: string;
  amenities: string;
  policies: string;
  languages: string;
  created_at?: string;
  updated_at?: string;
}

export type HotelFormData = Omit<Hotel, "id" | "created_at" | "updated_at">;
