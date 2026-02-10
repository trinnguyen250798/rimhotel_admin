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

export interface HotelResponse {
  data: Hotel[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type HotelFormData = Omit<Hotel, "id" | "created_at" | "updated_at">;
