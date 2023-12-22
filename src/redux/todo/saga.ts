import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import auth from "../../services/auth";
import {put, takeLatest} from "redux-saga/effects";
import {ADD_TODO, DELETE_TODO, EDIT_TODO} from "./types";
import {todoBeginAction, todoSuccessAction, todoErrorAction} from "./slice";
import {TodoType} from "../../types/todo";
import todoService from "../../services/todo";

function* addTodoSaga({payload: values}: PayloadAction<TodoType>) {
    yield put(todoBeginAction());
    try {
        const response: AxiosResponse<TodoType> = yield todoService.addTodo(values)
        yield put(todoSuccessAction(response));
    } catch (error) {
        yield put(todoErrorAction(error));
    }
}

function* deleteTodoSaga({payload: values}: PayloadAction<TodoType>) {
    // yield put(todoBeginAction());
    // try {
    //     const response: AxiosResponse<TodoType> = yield auth.todo(values)
    //     yield put(todoSuccessAction(response[0]));
    // } catch (error) {
    //     yield put(todoErrorAction(error));
    // }
}

function* editTodoSaga({payload: values}: PayloadAction<TodoType>) {
    // yield put(todoBeginAction());
    // try {
    //     const response: AxiosResponse<TodoType> = yield auth.todo(values)
    //     yield put(todoSuccessAction(response[0]));
    // } catch (error) {
    //     yield put(todoErrorAction(error));
    // }
}


export default [
    takeLatest(ADD_TODO, addTodoSaga),
    takeLatest(DELETE_TODO, deleteTodoSaga),
    takeLatest(EDIT_TODO, editTodoSaga),

];
