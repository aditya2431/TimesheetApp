import { combineReducers } from 'redux';
import LoginReducer from './reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
    LoginReducer: LoginReducer,
    form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
