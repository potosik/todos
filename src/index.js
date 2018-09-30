import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import todoApp from './reducers';
import App from './components/App';

const store = createStore(todoApp);
registerServiceWorker();

// inject store as a parameter for top level component
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);