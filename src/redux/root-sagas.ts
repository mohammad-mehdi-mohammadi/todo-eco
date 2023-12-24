import { all, fork } from "redux-saga/effects";
import AuthSaga from './auth/saga';
import TodoSaga from './todo/saga';

const rootSaga = function* () {
    yield all([
        ...AuthSaga,
        ...TodoSaga
    ]);
};

export default rootSaga;
