import {createStore} from "redux";
import todoApp from "./reducers";

const legger = (store) => (next) => {
    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
};

const promise = (store) => (next) => (action) => {
    // check if action is a promise
    if (typeof action.then === 'function') {
        // if it is wait for resolve and then path it to original dispatch
        return action.then(next);
    }
    return next(action);
};

/*
const addPromiseSupportToDispatch = (store) => {
    return (next) => {
        return (action) => {
            // check if action is a promise
            if (typeof action.then === 'function') {
                // if it is wait for resolve and then path it to original dispatch
                return action.then(next);
            }
            return next(action);
        }
    }
};

const addPromiseSupportToDispatch = (store) => {
    const next = store.dispatch;
    return (action) => {
        // check if action is a promise
        if (typeof action.then === 'function') {
            // if it is wait for resolve and then path it to original dispatch
            return action.then(next);
        }
        return next(action);
    }
};
 */

const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware =>
        store.dispatch = middleware(store)(store.dispatch)
    );
};

// order of dispatch modification is very important!
const configureStore = () => {
    const store = createStore(todoApp);
    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(legger);
    }

    wrapDispatchWithMiddlewares(store, middlewares);

    return store;
};

export default configureStore;