import {v4} from 'node-uuid';
import * as api from '../api';

const receiveTodos = (filter, responce) => ({
    type: 'RECEIVE_TODOS',
    filter,
    responce
});

// action returns a promise
// promise resolve generates a new action
// that action will be passed to original dispatch function
export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );

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