import {loadState, saveState} from "./localStorage";
import {createStore} from "redux";
import todoApp from "./reducers";
import throttle from "lodash/throttle";

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(todoApp, persistedState);

// subscribe to changes to save state to local storage
    store.subscribe(throttle(() => {
        // save only data state, not UI part
        saveState({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
};

export default configureStore;