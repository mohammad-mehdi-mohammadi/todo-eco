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
        yield put(loginSuccessAction(response[0]));
    } catch (error) {
        yield put(loginErrorAction(error));
    }
}
function* autoLoginWithTokenSaga({payload: token}: PayloadAction<string>) {
    // yield put(loginBeginAction());
    console.log(token, 'tokentokentoken')
    try {
        const response: AxiosResponse<UserType> = yield authService.autoLogin(token)
        console.log(response.data, response, "response.data, response")
        yield put(loginSuccessAction(response[0]));
    } catch (error) {
        yield put(loginErrorAction(error));
    }
}

// export function* watchLoginUser() {
//     yield takeLatest(LOGIN_USER, loginUserSaga);
// }
export default [
    takeLatest(LOGIN_USER, loginUserSaga),
    takeLatest(AUTO_LOGIN_WITH_TOKEN, autoLoginWithTokenSaga),
    // takeLatest(ABORT_REQUEST, abortRequestFlow),
    // takeLatest(INIT_LIST, initialListFlow),
];
