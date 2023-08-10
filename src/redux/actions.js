import {
  LOGIN_SUCESS,
  USER_OBJECT,
  IS_ADMIN_USER,
  ALL_USERS_OBJECT,
  ALL_CR_OBJECT
} from "./types";

export const saveLoginSuccess = (result) => ({
  type: LOGIN_SUCESS,
  payload: result,
});

export const setUserObject = (result) => ({
  type: USER_OBJECT,
  payload: result,
});

export const setAdminUser = (result) => ({
  type: IS_ADMIN_USER,
  payload: result,
});

export const setAllUserObject = (result) => ({
  type: ALL_USERS_OBJECT,
  payload: result,
});

export const setAllCRObject = (result) => ({
  type: ALL_CR_OBJECT,
  payload: result,
});
