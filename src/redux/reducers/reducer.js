import {
  LOGIN_SUCESS,
  USER_OBJECT,
  IS_ADMIN_USER,
  ALL_USERS_OBJECT,
  ALL_CR_OBJECT
} from "../types";

export const INITIAL_STATE = {
  isLoginSuccess: false,
  userObject: {},
  isAdminUser: false,
  allUsersObject: {},
  allCRObject:{}
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCESS:
      return {
        ...state,
        isLoginSuccess: action.payload,
      };
    case USER_OBJECT:
      return {
        ...state,
        userObject: action.payload,
      };
    case IS_ADMIN_USER:
      return {
        ...state,
        isAdminUser: action.payload,
      };
    case ALL_USERS_OBJECT:
      return {
        ...state,
        allUsersObject: action.payload,
      };

      case ALL_CR_OBJECT:
        return {
          ...state,
          allCRObject: action.payload,
        };
    default:
      return state;
  }
};

export default LoginReducer;
