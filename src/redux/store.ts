import { configureStore } from '@reduxjs/toolkit';
import { searchSliceReducer } from './searchSlice';
import { resultsSliceReducer } from './resultsSlice';
import { itemsPerPageSliceReducer } from './itemsPerPageSlice';
import { viewModeSliceReducer } from './viewModeSlice';
import { loaderMainSliceReducer } from './loaderMainSlice';
import { loaderDetailsSliceReducer } from './loaderDetailsSlice';
// import { api } from "../utils/api";

export const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    results: resultsSliceReducer,
    itemsPerPage: itemsPerPageSliceReducer,
    viewMode: viewModeSliceReducer,
    loaderMain: loaderMainSliceReducer,
    loaderDetails: loaderDetailsSliceReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(api.middleware),
});
