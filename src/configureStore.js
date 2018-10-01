import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import todoApp from "./reducers";

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