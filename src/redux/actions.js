import { LOGIN_SUCESS, USER_OBJECT, IS_ADMIN_USER} from "./types";

export const saveLoginSuccess = (result) => ({
    type: LOGIN_SUCESS,
    payload: result
});

export const setUserObject = (result) => ({
    type: USER_OBJECT,
    payload: result
});

export const setAdminUser = (result) => ({
    type: IS_ADMIN_USER,
    payload: result
});