import {UserType} from "../../types/auth";


export type IUserState = {
    data: UserType | null;
    isLoading: boolean;
    errors: string;
}

export type UserStateType = {
    user: IUserState,
}

export const USER = "user";
export type USER = typeof USER;

export const LOGIN_USER = "LOGIN_USER";
export const AUTO_LOGIN_WITH_TOKEN = "AUTO_LOGIN_WITH_TOKEN";
