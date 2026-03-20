export interface Country {
  id: number;
  name: string;
  name_en: string;
  code: string;
  phone_code: string;
  slug: string;
  currency: string;
  flag: string;
}

export interface Province {
  id: number;
  name: string;
  name_en: string;
  country_code: string;
  code: string;
  slug: string;
}

export interface District {
  id: number;
  name: string;
  province_code: string;
  code: string;
  slug: string;
}


