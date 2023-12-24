import {TodoType} from "../../types/todo";


export type ITodoState = {
    data: TodoType[] | null;
    isLoading: boolean;
    errors: string;
    isSuccess: boolean;
    total: number;
}

export type TodoStateType = {
    todo: ITodoState,
}

export const TODO = "todo";
export type TODO = typeof TODO;

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const LOAD_TODO_LIST = "LOAD_TODO_LIST";
export const TOGGLE_TODO = "TOGGLE_TODO";
