export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface Hotel {
  ulid: string;
  name: string;
  slug: string;
  subdomain: string | null;
  description: string | null;
  short_description: string | null;
  address: string | null;
  district: {
    id: string;
    code: string;
    name: string;
    province_code: string;
  } | null;
  province: {
    id: string;
    code: string;
    name: string;
    country_code: string;
  } | null;
  country: {
    id: string;
    code: string;
    name: string;
  } | null;
  latitude: string | null;
  longitude: string | null;
  star_rating: number;
  checkin_time: string;
  checkout_time: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  images: string[] | null;
  total_images: number;
  status: boolean;
  rating_avg: number | null;
  rating_count: number | null;
  price_from: number | null;
  price_to: number | null;
  is_refundable: boolean;
  is_free_cancellation: boolean;
  checkin_policy: string | null;
  checkout_policy: string | null;
  is_featured: boolean;
  is_top_deal: boolean;
  booking_count: number;
  view_count: number;
  type: string; // nếu bệ hạ có interface riêng cho type có thể replace
  type_label: string;
  languages: string[] | null;
  payment_options: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  amenities: Amenity[];
}

export interface HotelResponse {
  data: Hotel[];
  links: [] | null;
  meta: [] | null;
}

export interface HotelFormData {
  ulid: string | null;

  // Required
  name: string;
  address: string;
  province_code: string;
  country_code: string;

  // Nullable location
  district_code: string;
  latitude: string;
  longitude: string;

  // General info
  star_rating: number | null;
  checkin_time: string;
  checkout_time: string;
  phone: string;
  email: string;
  website: string;
  status: 0 | 1;
  type: string;

  // Description & SEO
  short_description: string;
  meta_title: string;
  meta_description: string;

  // Policies
  checkin_policy: string;
  checkout_policy: string;

  // Stats (admin-editable)
  rating_avg: number | null;
  rating_count: number | null;
  price_from: number | null;
  price_to: number | null;
  total_images: number | null;
  booking_count: number | null;
  view_count: number | null;

  // Flags
  is_refundable: boolean;
  is_free_cancellation: boolean;
  is_featured: boolean;
  is_top_deal: boolean;

  // Arrays
  languages: string[];
  payment_options: string[];
}

export interface HotelType {
  id: number;
  name: string;
  icon: string;
}

