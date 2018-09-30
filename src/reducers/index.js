import { combineReducers } from 'redux';
import todos from './todos';

// combination of reducers
const todoApp = combineReducers({
    todos
});

export default todoApp;