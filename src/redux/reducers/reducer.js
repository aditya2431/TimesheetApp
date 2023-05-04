import { LOGIN_SUCESS, USER_OBJECT } from "../types";

export const INITIAL_STATE = {
    isLoginSuccess: false,
    userObject: {}
};

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCESS:
            return {
                ...state,
                isLoginSuccess: action.payload
            };
        case USER_OBJECT:
            return {
                ...state,
                userObject: action.payload
            };
        default:
            return state;
    }
};

export default LoginReducer;