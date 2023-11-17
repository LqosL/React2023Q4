import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';

export type LoaderDetailsState = {
  loaderDetails: boolean;
};
export type LoaderDetailsStatePart = {
  loaderDetails: LoaderDetailsState;
};

export type LoaderDetailsAction = {
  payload: boolean;
};

const LoaderDetailsSlice = createSlice({
  name: 'loaderDetails',
  initialState: {
    loaderDetails: false,
  },
  reducers: {
    updateLoaderDetails: (state, action) => {
      state.loaderDetails = action.payload;
    },
  },
});

export const {
  updateLoaderDetails,
}: CaseReducerActions<
  {
    updateLoaderDetails: (
      state: LoaderDetailsState,
      action: LoaderDetailsAction
    ) => void;
  },
  string
> = LoaderDetailsSlice.actions;

export const loaderDetailsSliceReducer = LoaderDetailsSlice.reducer;
