import {combineReducers} from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

// reducers to have a filtered ids of objects to be able
// to show cached values by filtering in getVisibleTodos
// while receiving updated state
const listByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed')
});

const todos = combineReducers({byId, listByFilter});

export default todos;

// helper to filter available todos
// the selector function
// selects something from the corresponding state
// state now contains state for byId and allIds reducers!!!
export const getVisibleTodos = (state, filter) => {
    const ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
    fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
    fromList.getErrorMessage(state.listByFilter[filter]);
