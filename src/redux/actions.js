import { LOGIN_SUCESS, USER_OBJECT } from "./types";

export const saveLoginSuccess = (result) => ({
    type: LOGIN_SUCESS,
    payload: result
});

export const setUserObject = (result) => ({
    type: USER_OBJECT,
    payload: result
});