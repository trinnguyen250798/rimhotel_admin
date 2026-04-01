import { configureStore } from '@reduxjs/toolkit';
import hotelCurrentReducer from './slices/hotelSlice';
import locationReducer from './slices/locationSlice';
import { injectStore } from '@/lib/axios';

export const store = configureStore({
  reducer: {
    hotelCurrent: hotelCurrentReducer,
    location: locationReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;        