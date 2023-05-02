import {configureStore} from '@reduxjs/toolkit';
import rootReducers from './reducers/reducer';
// const store = configureStore({
//     reducer: rootReducers,
// })

// export default store;

import {createStore, applyMiddleware, compose} from "redux";

import thunk from "redux-thunk";


export default function reduxStore(preloadedState) {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];
    
    const composedEnhancer = compose(...storeEnhancers);

    const store = configureStore(
        {reducer:rootReducers},
        preloadedState,
        composedEnhancer
    );

    return store;
}