import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import todoApp from "./reducers";

// the middleware to be able to process thunks
// if action is a function (thunk actually) then it will be called
// and current dispatch will be passed (with all previous middleware)
// otherwise it just will be passed to next middleware to process
const thunk = (store) => (next) => (action) =>
    typeof action === 'function' ?
        action(store.dispatch) :
        next(action);

// order of dispatch modification is very important!
const configureStore = () => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const store = createStore(
        todoApp,
        /*
            persisited state should be the second parameter, but it's optional
            persistedState,
        */
        // applying middleware
        applyMiddleware(...middlewares)
    );
    return store;
};

export default configureStore;