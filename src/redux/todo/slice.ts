import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodoState, TODO} from "./types";
import {TodoType} from "../../types/todo";


const todoInitialState: ITodoState = {
    data: null,
    isLoading: false,
    errors: '',
    isSuccess: false,
    total: 0,
}

export const todoSlice = createSlice({
    name: TODO,
    initialState: todoInitialState,
    reducers: {
        todoBeginAction: (state: ITodoState) => {
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                errors: '',
            }

        },
        todoSuccessAction: (state: ITodoState, {payload: todo}: PayloadAction<TodoType>) => {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        },
        todoErrorAction: (state: ITodoState, {payload: error}: PayloadAction<string>) => {
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                errors: error
            }
        },
        todoLoadSuccessAction: (state: ITodoState, {payload: data}: PayloadAction<{ data: TodoType[], total: number }>) => {
            return {
                ...state,
                isSuccess: false,
                data: data.data,
                total: data.total
            }
        },
        todoToggleSuccessAction: (state: ITodoState, {payload: todo}: PayloadAction<TodoType>) => {
            return {
                ...state,
                data: state.data?.map(item => {
                    if (item.id === todo.id) {
                        return {
                            ...item,
                            isCompleted: !item.isCompleted
                        }
                    }
                    return item
                })
            }
        },
        todoEditSuccessAction: (state: ITodoState, {payload: todo}: PayloadAction<TodoType>) => {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: state.data?.map(item => {
                    if (item.id === todo.id) {
                        return {
                            ...item,
                            title: todo.title
                        }
                    }
                    return item
                })
            }
        },
    }
})


export const {
    todoBeginAction,
    todoSuccessAction,
    todoErrorAction,
    todoLoadSuccessAction,
    todoToggleSuccessAction,
    todoEditSuccessAction,
} = todoSlice.actions;
export default todoSlice.reducer;
