import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {UserType} from "../../types/auth";
import {IUserState, USER} from "./types";

const usersInitialState: IUserState = {
    data: null,
    isLoading: false,
    errors: '',
}

export const usersSlice = createSlice({
    name: USER,
    initialState: usersInitialState,
    reducers: {
        loginBeginAction: (state: IUserState) => {
            state.isLoading = true;
            state.errors = '';
        },
        loginSuccessAction: (state: IUserState, {payload: user}: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.data = user;
        },
        loginErrorAction: (state: IUserState, {payload: error}: PayloadAction<string>) => {
            state.isLoading = false;
            state.errors = error;
        },
        autoLoginAction: (state: IUserState, {payload: user}: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.data = user;
        },
    }
})


export const {
    loginBeginAction,
    loginSuccessAction,
    loginErrorAction,
    autoLoginAction,
} = usersSlice.actions;
export default usersSlice.reducer;
