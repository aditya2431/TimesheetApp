import { LOGIN_SUCESS } from "../types";

export const INITIAL_STATE = {
    isLoginSuccess: false,
};

const memberAdminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCESS:
            return {
                ...state,
                isLoginSuccess: action.result
            };
        default:
            return state;
    }
};
export default memberAdminReducer;