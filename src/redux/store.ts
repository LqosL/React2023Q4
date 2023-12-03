import { configureStore } from '@reduxjs/toolkit';
import {formSliceReducer} from "./formSlice";
import {resultsSliceReducer} from "./resultsSlice";

export const store = configureStore({
    reducer: {
        form: formSliceReducer,
        results: resultsSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});