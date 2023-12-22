import instance from "./instance";
import {UserType} from "../types/auth";

const authService = {
    register: (data: UserType) => instance().post("/users", data),
    login: (data: UserType) => instance().get(`/users?username=${data.username}&password=${data.password}`),
    autoLogin: (token: string) => instance().get(`/users?token=${token}`)
};

export default authService
