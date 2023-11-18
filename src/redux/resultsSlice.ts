import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';
import { Result } from '../types/Result';

export type ResultsState = {
  results: Result[];
};
export type ResultsStatePart = {
  results: ResultsState;
};

export type ResultsAction = {
  payload: Result[];
};

const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    results: [],
  },
  reducers: {
    updateResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const {
  updateResults,
}: CaseReducerActions<
  { updateResults: (state: ResultsState, action: ResultsAction) => void },
  string
> = resultsSlice.actions;

export const resultsSliceReducer = resultsSlice.reducer;
