import { LOGIN_SUCESS } from "../types";

export const INITIAL_STATE = {
    isLoginSuccess: false,
};

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCESS:
            console.log("action",action.payload)
            debugger
            return {
                ...state,
                isLoginSuccess: action.payload
            };
        default:
            return state;
    }
};
export default LoginReducer;