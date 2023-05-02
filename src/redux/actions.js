import { LOGIN_SUCESS } from "./types";

export const saveLoginSuccess = (result) => ({
    type: LOGIN_SUCESS,
    payload: result
});