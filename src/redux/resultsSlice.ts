import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';
import { UserInfoImaged } from '../types/UserInfoImaged';

export type ResultsStack = {
  results: Array<UserInfoImaged>;
};

export type AddResultsAction = {
  payload: UserInfoImaged;
};

const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    results: [],
  },
  reducers: {
    updateResults: (state: ResultsStack, action: AddResultsAction) => {
      state.results.push(action.payload);
    },
  },
});

export const {
  updateResults,
}: CaseReducerActions<
  {
    updateResults: (
      state: Array<UserInfoImaged>,
      action: AddResultsAction
    ) => void;
  },
  string
> = resultsSlice.actions;
export const resultsSliceReducer = resultsSlice.reducer;
