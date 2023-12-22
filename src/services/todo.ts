import instance from "./instance";
import {TodoType} from "../types/todo";

const todoService = {
    addTodo: (data: TodoType) => instance().post("/todo", data),
    deleteTodo: (id: number) => instance().get(`/todo/${id}`),
    // editTodo: (id: number, title: string) => instance().patch(`/todo?id=${id}`, data)
};

export default todoService
