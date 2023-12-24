import instance from "./instance";
import {TodoParamsPayloadType, TodoType} from "../types/todo";

const todoService = {
    addTodo: (data: TodoType) => instance().post("/todo", data),
    loadTodoList: (data: TodoParamsPayloadType) => instance().get(`/todo?_page=${data.page}&_limit=${data.limit}&token=${data.token}&q=${data.search}&_sort=id&_order=desc`),
    deleteTodo: (id: number) => instance().delete(`/todo/${id}`),
    editTodo: (data: TodoType) => instance().patch(`/todo/${data.id}`, data),
    toggleTodo: (data: TodoType) => instance().patch(`/todo/${data.id}`, data),
    getTodo: (id: number, token: string) => instance().get(`/todo?token=${token}&id=${id}`),
};

export default todoService
