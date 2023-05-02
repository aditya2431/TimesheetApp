import { LOGIN_SUCESS, USER_EMAIL_ID } from "./types";

export const saveLoginSuccess = (result) => ({
    type: LOGIN_SUCESS,
    payload: result
});

export const setUserEmailId = (result) => ({
    type: USER_EMAIL_ID,
    payload: result
});