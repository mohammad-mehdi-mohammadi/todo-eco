import { all, fork } from "redux-saga/effects";
import AuthSaga from './auth/saga';

const rootSaga = function* () {
    yield all([
        ...AuthSaga,
    ]);
};

export default rootSaga;
