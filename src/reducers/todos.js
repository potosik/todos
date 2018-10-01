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

export default todos;

// helper to filter available todos
// the selector function
// selects something from the corresponding state
export const getVisibleTodos = (state, filter) => {
    switch (filter) {
        case 'all':
            return state;
        case 'active':
            return state.filter(t => !t.completed);
        case 'completed':
            return state.filter(t => t.completed);
    }
};