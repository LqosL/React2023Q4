import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';
import {UserInfo} from "../types/UserInfo";

export type ResultsStack = {
    results: Array<UserInfo>,
}

export type AddResultsAction = {
    payload: UserInfo;
}

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
    { updateResults: (state: Array<UserInfo>, action: AddResultsAction) => void },
    string
> = resultsSlice.actions;
export const resultsSliceReducer = resultsSlice.reducer;