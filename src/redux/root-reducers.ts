
import usersReducer from "./auth/slice";
import todoReducer from "./todo/slice";

const rootReducers = {
    user: usersReducer,
    todo: todoReducer,
};

export default rootReducers;
