import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {UserType} from "../../types/auth";
import {IUserState, USER} from "./types";

const usersInitialState: IUserState = {
    data: null,
    isLoading: false,
    errors: '',
    isLogout: false,
}

export const usersSlice = createSlice({
    name: USER,
    initialState: usersInitialState,
    reducers: {
        loginBeginAction: (state: IUserState) => {
            return {
                ...state,
                isLoading: true,
                errors: '',
            }
        },
        loginSuccessAction: (state: IUserState, {payload: user}: PayloadAction<UserType>) => {
            return {
                ...state,
                isLoading: false,
                data: user,
                isLogout: false,
            }
        },
        loginErrorAction: (state: IUserState, {payload: error}: PayloadAction<string>) => {
            return {
                ...state,
                isLoading: false,
                errors: error,
            }
        },
        logoutAction: (state: IUserState) => {
            return {
                ...state,
                data: null,
                isLogout: true,
            }
        },
    }
})


export const {
    loginBeginAction,
    loginSuccessAction,
    loginErrorAction,
    logoutAction,
} = usersSlice.actions;
export default usersSlice.reducer;
