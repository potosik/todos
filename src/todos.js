import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

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

// combination of reducers
const todoApp = combineReducers({
    todos,
    visibilityFilter
});
const store = createStore(todoApp);
let nextTodoId = 0;

// application component
class TodoApp extends React.Component {
    render() {
        return (
            <div>
                <input ref={node => {
                    // assign element to be able to acces it
                    this.input = node;
                }}/>
                <button onClick={() => {
                    // dispatching an action
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    // clear input
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo => {
                        // render elemets by mapping them
                        return (
                            <li key={todo.id}
                                onClick={() => {
                                    // dispatching action
                                    store.dispatch({
                                        type: 'TOGGLE_TODO',
                                        id: todo.id
                                    });
                                }}
                                style={{
                                    // add some styles to see the changes
                                    textDecoration:
                                        todo.completed ?
                                            'line-through' :
                                            'none'
                                }}>
                                {todo.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

// renderer
const render = () => {
    ReactDOM.render(
        <TodoApp
            todos={store.getState().todos}
        />,
        document.getElementById('root')
    );
};

// subscribe for changes
store.subscribe(render);
render();