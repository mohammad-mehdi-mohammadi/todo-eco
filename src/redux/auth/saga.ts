import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {put, takeLatest} from "redux-saga/effects";
import {UserType} from "../../types/auth";
import {AUTO_LOGIN_WITH_TOKEN, LOGIN_USER} from "./types";
import {loginBeginAction, loginErrorAction, loginSuccessAction} from "./slice";
import authService from "../../services/auth";

function* loginUserSaga({payload: values}: PayloadAction<UserType>) {
    yield put(loginBeginAction());
    try {
        const response: AxiosResponse<UserType> = yield authService.login(values)
        yield put(loginSuccessAction(response.data[0]));
    } catch (error) {
        yield put(loginErrorAction(error));
    }
}
function* autoLoginWithTokenSaga({payload: token}: PayloadAction<string>) {
    try {
        const response: AxiosResponse<UserType> = yield authService.autoLogin(token)
        yield put(loginSuccessAction(response.data[0]));
    } catch (error) {
        yield put(loginErrorAction(error));
    }
}

export default [
    takeLatest(LOGIN_USER, loginUserSaga),
    takeLatest(AUTO_LOGIN_WITH_TOKEN, autoLoginWithTokenSaga),
];
