import {v4} from 'node-uuid';

export const receiveTodos = (filter, responce) => ({
    type: 'RECEIVE_TODOS',
    filter,
    responce
});

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