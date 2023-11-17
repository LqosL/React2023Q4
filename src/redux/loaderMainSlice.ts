import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';

export type LoaderMainState = {
  loaderMain: boolean;
};
export type LoaderMainStatePart = {
  loaderMain: LoaderMainState;
};

export type LoaderMainAction = {
  payload: boolean;
};

const LoaderMainSlice = createSlice({
  name: 'loaderMain',
  initialState: {
    loaderMain: false,
  },
  reducers: {
    updateLoaderMain: (state, action) => {
      state.loaderMain = action.payload;
    },
  },
});

export const {
  updateLoaderMain,
}: CaseReducerActions<
  {
    updateLoaderMain: (
      state: LoaderMainState,
      action: LoaderMainAction
    ) => void;
  },
  string
> = LoaderMainSlice.actions;

export const loaderMainSliceReducer = LoaderMainSlice.reducer;
