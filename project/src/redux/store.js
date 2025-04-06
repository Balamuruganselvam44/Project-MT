import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import countriesReducer from './homeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
  },
});
export default store;
