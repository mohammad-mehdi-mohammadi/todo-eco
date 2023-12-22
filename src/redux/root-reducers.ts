import {UserStateType} from "./auth/types";
import usersReducer from "./auth/slice";
export type StateType = {
    user: UserStateType;
};

const rootReducers = {
    user: usersReducer,
};

export default rootReducers;
