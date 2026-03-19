export interface Hotel {
  ulid: string;                // thay id
  name: string;
  slug: string;
  description: string | null;
  address: {
    address: string;
    district: {
      id: string;
      code: string;
      name: string;
      province_code: string;
    };
    province: {
      id: string;
      code: string;
      name: string;
      country_code: string;
    };
    country: {
      id: string;
      code: string;
      name: string;
    };
  };
  location: {
    lat: string;
    lng: string;
  };
  star_rating: number;
  checkin_time: string;
  checkout_time: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  images: string[] | null;
  status: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface HotelResponse {
  data: Hotel[];
  links: [] | null;
  meta: [] | null;
}

export type HotelFormData = Omit<Hotel, "id" | "created_at" | "updated_at">;
