import { configureStore } from '@reduxjs/toolkit';
import { resultsSliceReducer } from './resultsSlice';
import { countriesSliceReducer } from './countriesSlice';

export const store = configureStore({
  reducer: {
    results: resultsSliceReducer,
    countries: countriesSliceReducer,
  },
});
