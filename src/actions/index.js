import {v4} from 'node-uuid';

// ACTION CREATORS
let nextTodoId = 0;
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text: text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});