import {combineReducers} from 'redux';

const byId = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_TODOS':
            const nextState = {...state};
            action.responce.forEach(todo => {
                nextState[todo.id] = todo;
            });
            return nextState;
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    if (action.filter !== 'all') {
        return state;
    }

    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.responce.map(todo => todo.id);
        default:
            return state;
    }
};

const activeIds = (state = [], action) => {
    if (action.filter !== 'active') {
        return state;
    }

    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.responce.map(todo => todo.id);
        default:
            return state;
    }
};

const completedIds = (state = [], action) => {
    if (action.filter !== 'completed') {
        return state;
    }

    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.responce.map(todo => todo.id);
        default:
            return state;
    }
};

// reducers to have a filtered ids of objects to be able
// to show cached values by filtering in getVisibleTodos
// while receiving updated state
const idsByFilter = combineReducers({
    all: allIds,
    active: activeIds,
    completed: completedIds
});

const todos = combineReducers({byId, idsByFilter});

export default todos;

// helper to filter available todos
// the selector function
// selects something from the corresponding state
// state now contains state for byId and allIds reducers!!!
export const getVisibleTodos = (state, filter) => {
    const ids = state.idsByFilter[filter];
    return ids.map(id => state.byId[id]);
};