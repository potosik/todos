import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import {fetchTodos} from "./api";

fetchTodos('all').then(todos =>
    console.log(todos)
);

const store = configureStore();
registerServiceWorker();

// inject store as a parameter for top level component
render(
    <Root store={store}/>,
    document.getElementById('root')
);