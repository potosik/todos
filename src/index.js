import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import todoApp from './reducers';
import App from './components/App';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = createStore(todoApp, persistedState);
registerServiceWorker();

// subscribe to changes to save state to local storage
store.subscribe(throttle(() => {
    // save only data state, not UI part
    saveState({
        todos: store.getState().todos
    });
}, 1000));

// inject store as a parameter for top level component
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);