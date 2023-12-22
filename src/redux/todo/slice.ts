import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodoState, TODO} from "./types";
import {TodoType} from "../../types/todo";


const todoInitialState: ITodoState = {
    data: null,
    isLoading: false,
    errors: '',
}

export const todoSlice = createSlice({
    name: TODO,
    initialState: todoInitialState,
    reducers: {
        todoBeginAction: (state: ITodoState) => {
            state.isLoading = true;
            state.errors = '';
        },
        todoSuccessAction: (state: ITodoState, {payload: todo}: PayloadAction<TodoType>) => {
            state.isLoading = false;
            state.data = todo;
        },
        todoErrorAction: (state: ITodoState, {payload: error}: PayloadAction<string>) => {
            state.isLoading = false;
            state.errors = error;
        },

    }
})


export const {
    todoBeginAction,
    todoSuccessAction,
    todoErrorAction,
} = todoSlice.actions;
export default todoSlice.reducer;
