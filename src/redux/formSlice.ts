import { CaseReducerActions, createSlice } from '@reduxjs/toolkit';
import {UserInfo} from "../types/UserInfo";


export type FormAction = {
    payload: UserInfo;
}

const formSlice = createSlice({
    name: 'form',
    initialState: {
        name: '',
        age: undefined,
        email: '',
        password1: '',
        password2: '',
        gender: '',
        acceptTerms: false,
        image: '',
        country: '',
    },
    reducers: {
        updateForm: (state, action: FormAction) => {
            state.name = action.payload.name;
            state.age = action.payload.age;
            state.email = action.payload.email;
            state.password1 = action.payload.password1;
            state.password2 = action.payload.password1;
            state.gender = action.payload.gender;
            state.acceptTerms = action.payload.acceptTerms;
            state.image = action.payload.image;
            state.country = action.payload.country;
        },
    },
});

export const {
    updateForm,
}: CaseReducerActions<
    { updateForm: (state: UserInfo, action: FormAction) => void },
    string
> = formSlice.actions;
export const formSliceReducer = formSlice.reducer;