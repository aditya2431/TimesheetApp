import {combineReducers} from "redux";

import LoginReducer from './reducer';

const rootReducers = combineReducers({
    LoginReducer: LoginReducer
    // form: formReducer
});

export default rootReducers;