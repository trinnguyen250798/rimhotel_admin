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
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface HotelResponse {
  data: Hotel[];
  links: [] | null;
  meta: [] | null;
}

export interface HotelFormData {
  ulid: string | null;
  name: string;
  description: string;
  address: string;

  district_code: string;
  province_code: string;
  country_code: string;

  latitude: string;   // hoặc number nếu bệ hạ parse trước
  longitude: string;  // idem

  star_rating: number;

  checkin_time: string;   // format "HH:mm:ss"
  checkout_time: string;  // format "HH:mm:ss"

  phone: string;
  email: string;
  website: string;

  status: number; // 1 | 0 nếu muốn strict hơn
}

