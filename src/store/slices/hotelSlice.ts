import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel } from '@/types/hotel';

interface HotelState {
  hotelCurrent: Hotel | null;
}

const initialState: HotelState = {
  hotelCurrent: null,
};

export const hotelSlice = createSlice({
  name: 'hotelCurrent',
  initialState,
  reducers: {
    setHotel: (state, action: PayloadAction<Hotel>) => {
      state.hotelCurrent = action.payload;
    },
    clearHotel: (state) => {
      state.hotelCurrent = null;
    }
  },
});

export const { setHotel, clearHotel } = hotelSlice.actions;
export default hotelSlice.reducer;