import { configureStore } from '@reduxjs/toolkit';
import { searchSliceReducer } from './searchSlice';
import { resultsSliceReducer } from './resultsSlice';

export const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    results: resultsSliceReducer,
  },
});
