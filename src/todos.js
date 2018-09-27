// its called: reducer composition
// each reducer passes only a part of state tree when calls other reducer
const todo = (state, action) => {
    switch (action.type) {
        // just return a new object
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        // operation on concrete todo element
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            // copy an object and replace one field
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                // will create a new object and add it to array
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            // just perform an operation on every element
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

// all reducers passed
const combineReducers = (reducers) => {
    // the result is a function that has the same
    // signature as reducer
    // it will be called as a simple reducer
    return (state = {}, action) => {
        // whole state will be updated as it must be covered
        // by reducer's names
        return Object.keys(reducers).reduce(
            // for each key will be executed a function
            // nextState will be passed across all executions
            (nextState, key) => {
                // the part of the state for concrete reducer
                // created by executing concrete reducer by
                // passing current state and action
                nextState[key] = reducers[key](
                    state[key],
                    action
                );
                // return the accumulated state
                return nextState;
            },
            // the initial state for nextState value
            {}
        );
    };
};

// combination of reducers
const todoApp = combineReducers({
    todos,
    visibilityFilter
});