import { configureStore } from '@reduxjs/toolkit';
import hotelCurrentReducer from './slices/hotelSlice';

export const store = configureStore({
  reducer: {
    hotelCurrent: hotelCurrentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;        