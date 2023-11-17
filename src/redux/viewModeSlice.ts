import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';

export type ViewModeState = {
  viewMode: boolean;
};
export type ViewModeStatePart = {
  viewMode: ViewModeState;
};

export type ViewModeAction = {
  payload: boolean;
};

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState: {
    viewMode: false,
  },
  reducers: {
    updateViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  updateViewMode,
}: CaseReducerActions<
  { updateViewMode: (state: ViewModeState, action: ViewModeAction) => void },
  string
> = viewModeSlice.actions;

export const viewModeSliceReducer = viewModeSlice.reducer;
