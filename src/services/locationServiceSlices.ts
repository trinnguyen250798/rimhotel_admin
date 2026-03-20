import axios from '@/lib/axios';
import { Country, Province, District } from '@/types/location';

const locationService = {
  getCountries() {
    return axios.get<Country[]>('/location/countries');
  },

  getProvinces(countryCode: string) {
    return axios.get<Province[]>(`/location/${countryCode}/provinces`);
  },

  getDistricts(provinceCode: string) {
    return axios.get<District[]>(`/location/${provinceCode}/districts`);
  },

};

export default locationService;