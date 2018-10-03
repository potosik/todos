import {v4} from 'node-uuid';
import {getIsFetching} from '../reducers';
import * as api from '../api';

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

    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter
    });

    return api.fetchTodos(filter).then(
        response => {
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter,
                response
            });
        },
        error => {
            dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter,
                message: error.message || 'Something went wrong.'
            });
        }
    );
    /*
    // if one of the reducers or subscribed components throws an error
    // catch block will be active an (internal) error will be displayed to the user
    // but error handler above will only process rejected promises error
    ).catch(...);
     */
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