import axios from '@/lib/axios';
import { Country, Province, District } from '@/types/location';
export interface LocationResponse<T = Country[] | Province[] | District[]> {
  data: T;
  status: string;
  message: string;
}
const locationService = {
  getCountries: async (): Promise<LocationResponse<Country[]>> => {
    const res = await axios.get('/location/countries');
    return res.data;
  },

  getProvinces: async (countryCode: string): Promise<LocationResponse<Province[]>> => {
    const res = await axios.get(`/location/${countryCode}/provinces`);
    return res.data;
  },

  getDistricts: async (provinceCode: string): Promise<LocationResponse<District[]>> => {
    const res = await axios.get(`/location/${provinceCode}/districts`);
    return res.data;
  },

};

export default locationService;