import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {put, takeLatest} from "redux-saga/effects";
import {ADD_TODO, DELETE_TODO, EDIT_TODO, LOAD_TODO_LIST, TOGGLE_TODO} from "./types";
import {
    todoBeginAction,
    todoSuccessAction,
    todoErrorAction,
    todoLoadSuccessAction,
    todoToggleSuccessAction, todoEditSuccessAction
} from "./slice";
import {TodoParamsPayloadType, TodoType} from "../../types/todo";
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

function* deleteTodoSaga({payload: id}: PayloadAction<number>) {
    yield put(todoBeginAction());
    try {
        const response: AxiosResponse<TodoType> = yield todoService.deleteTodo(id)
        yield put(todoSuccessAction(response));
    } catch (error) {
        yield put(todoErrorAction(error));
    }
}

function* editTodoSaga({payload: values}: PayloadAction<TodoType>) {
    yield put(todoBeginAction());
    try {
        yield todoService.editTodo(values)
        yield put(todoEditSuccessAction(values));
    } catch (error) {
        yield put(todoErrorAction(error));
    }
}
function* loadTodoListSaga({payload: values}: PayloadAction<TodoParamsPayloadType>) {
    try {
        const response: AxiosResponse<{data: TodoType[], headers: Object}> = yield todoService.loadTodoList(values)
        const data = {
            data: response.data,
            total: response.headers['x-total-count']
        }
        yield put(todoLoadSuccessAction(data));
    } catch (error) {
        yield put(todoErrorAction(error));
    }
}
function* toggleTodoListSaga({payload: values}: PayloadAction<TodoType>) {

    try {
        yield todoService.toggleTodo({
            ...values,
            isCompleted: !values.isCompleted
        })
        yield put(todoToggleSuccessAction(values));
    } catch (error) {
        yield put(todoErrorAction(error));
    }
}


export default [
    takeLatest(ADD_TODO, addTodoSaga),
    takeLatest(DELETE_TODO, deleteTodoSaga),
    takeLatest(EDIT_TODO, editTodoSaga),
    takeLatest(LOAD_TODO_LIST, loadTodoListSaga),
    takeLatest(TOGGLE_TODO, toggleTodoListSaga),

];
