import {getIsFetching} from '../reducers';
import {normalize} from 'normalizr';
import * as api from '../api';
import * as schema from './schema';

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
                response: normalize(response, schema.arrayOfTodos)
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

// THUNK ACTION CREATORS
export const addTodo = (text) => (dispatch) =>
    api.addTodo(text).then(response => {
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response: normalize(response, schema.todo)
        });
    });

export const toggleTodo = (id) => (dispatch) =>
    api.toggleTodo(id).then(response => {
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response: normalize(response, schema.todo)
        });
    });