import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';

export type ItemsPerPageState = {
  itemsPerPage: string;
};
export type ItemsPerPageStatePart = {
  itemsPerPage: ItemsPerPageState;
};

export type ItemsPerPageAction = {
  payload: string;
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState: {
    itemsPerPage: 7,
  },
  reducers: {
    updateItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  updateItemsPerPage,
}: CaseReducerActions<
  {
    updateItemsPerPage: (
      state: ItemsPerPageState,
      action: ItemsPerPageAction
    ) => void;
  },
  string
> = itemsPerPageSlice.actions;

export const itemsPerPageSliceReducer = itemsPerPageSlice.reducer;
