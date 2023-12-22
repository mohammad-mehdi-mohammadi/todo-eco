import createSagaMiddleware from "@redux-saga/core";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import rootReducers from "./root-reducers";
import rootSaga from "./root-sagas";
import logger from "redux-logger";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducers,
    // middleware: [sagaMiddleware],
    middleware: () => new Tuple(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export default store;
