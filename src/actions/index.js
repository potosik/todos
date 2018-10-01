import {v4} from 'node-uuid';
import {getIsFetching} from '../reducers';
import * as api from '../api';

const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
});

const receiveTodos = (filter, responce) => ({
    type: 'RECEIVE_TODOS',
    filter,
    responce
});

// action returns a promise
// promise resolve generates a new action
// that action will be passed to original dispatch function
// returns a function that want dispatch as an argument to be able
// to dispatch actions by itself (it is a THUNK actually)
export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        // returns promise to consistency, it resolves immediately
        return Promise.resolve();
    }

    dispatch(requestTodos(filter));

    return api.fetchTodos(filter).then(response => {
        dispatch(receiveTodos(filter, response));
    });
};

// ACTION CREATORS
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text: text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});