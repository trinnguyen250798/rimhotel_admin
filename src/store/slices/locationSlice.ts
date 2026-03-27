import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import locationService from '@/services/locationServiceSlices';
import { Country, Province, District } from '@/types/location';

interface LocationState {
  countries: Country[];
  provinces: {
    [country_code: string]: Province[];
  };
  districts: {
    [province_code: string]: District[];
  };
  loading: boolean;
}

const initialState: LocationState = {
  countries: [],
  provinces: {},
  districts: {},
  loading: false,
};


// 🔥 fetch countries (load 1 lần)
export const fetchCountries = createAsyncThunk(
  'location/fetchCountries',
  async () => {
    const res = await locationService.getCountries();
    return res.data;
  }
);


// 🔥 fetch provinces theo country (có cache)
export const fetchProvincesByCountry = createAsyncThunk(
  'location/fetchProvincesByCountry',
  async (country_code: string) => {
    const res = await locationService.getProvinces(country_code);
    return { country_code, data: res.data };
  }
);

// 🔥 fetch districts theo province (có cache)
export const fetchDistrictsByProvince = createAsyncThunk(
  'location/fetchDistrictsByProvince',
  async (province_code: string) => {
    const res = await locationService.getDistricts(province_code);
    return { province_code, data: res.data };
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<Country[]>) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.loading = false;
      })

      // provinces
      .addCase(fetchProvincesByCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvincesByCountry.fulfilled, (state, action) => {
        const { country_code, data } = action.payload;
        state.provinces[country_code] = data;
        state.loading = false;
      })
      .addCase(fetchProvincesByCountry.rejected, (state) => {
        state.loading = false;
      })

      // districts
      .addCase(fetchDistrictsByProvince.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDistrictsByProvince.fulfilled, (state, action) => {
        const { province_code, data } = action.payload;
        state.districts[province_code] = data;
        state.loading = false;
      })
      .addCase(fetchDistrictsByProvince.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default locationSlice.reducer;