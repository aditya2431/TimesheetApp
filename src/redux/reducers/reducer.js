import { LOGIN_SUCESS, USER_EMAIL_ID } from "../types";

export const INITIAL_STATE = {
    isLoginSuccess: false,
    userEmailId: ''
};

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCESS:
            return {
                ...state,
                isLoginSuccess: action.payload
            };
        case USER_EMAIL_ID:
            return {
                ...state,
                userEmailId: action.payload
            };
        default:
            return state;
    }
};

export default LoginReducer;