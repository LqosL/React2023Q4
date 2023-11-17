import {CaseReducerActions, createSlice } from "@reduxjs/toolkit";

export type SearchState = {
    search: string,
}
export type SearchStatePart = {
    search: SearchState
}

export type SearchAction = {
    payload: {
        text: string
    }
}

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: 'hello',
    },
    reducers: {
        updateSearch: (state, action) => {
            state.search = action.payload.text;
        }
    }
})

export const { updateSearch }: CaseReducerActions<{ updateSearch: (state: SearchState, action: SearchAction) => void }, string> = searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;