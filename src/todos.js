import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
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

// filter link component
const Link = ({
                  active,
                  children,
                  onClick
              }) => {
    // check if it is a current filter
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href='#'
           onClick={e => {
               // preventing link behavior
               e.preventDefault();
               onClick();
           }}>
            {children}
        </a>
    )
};

const mapStateToFilterLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};
const mapDispatchToFilterLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () =>
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            })
    }
};
// auto-generated container component for displaying filter link
const FilterLink = connect(
    mapStateToFilterLinkProps,
    mapDispatchToFilterLinkProps
)(Link);

// presentational component to display filter links
const Footer = () => {
    return (
        <p>
            Show
            {' '}
            <FilterLink
                filter='SHOW_ALL'
            >
                All
            </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_ACTIVE'
            >
                Active
            </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_COMPLETED'
            >
                Completed
            </FilterLink>
        </p>
    );
};

// presentational component to display a single todo
const Todo = ({
                  onClick,
                  completed,
                  text
              }) => (
    <li onClick={onClick}
        style={{
            // add some styles to see the changes
            textDecoration:
                completed ?
                    'line-through' :
                    'none'
        }}>
        {text}
    </li>
);

// presentational component to display a list of todos
const TodoList = ({
                      todos,
                      onTodoClick
                  }) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}/>
        )}
    </ul>
);

// presentation component to add todos to list
// second argument is a context, receiving store from there
let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <input ref={node => {
                // assign element to be able to access it
                input = node;
            }}/>
            <button onClick={() => {
                // dispatching an action
                dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text: input.value
                });
                // clear input
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};
/*
AddTodo = connect(
    state => {
        return {};
    },
    dispatch => {
        return {dispatch};
    }
)(AddTodo);
*/
//AddTodo = connect(null, null);
// not subscribe to the store
// just inject dispatch to props
AddTodo = connect()(AddTodo);

// helper to filter available todos
const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
    }
};

// returns props that is depends on store
// maps store state to the props of component
const mapStateToVisibleTodoListProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};
// returns functions that is calls dispatch of the store
// maps dispatch method of the store to the action methods of component
const mapDispatchToVisibleTodoListProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    };
};
// auto-generated container component for mapping state and
// dispatch function to target component
const VisibleTodoList = connect(
    mapStateToVisibleTodoListProps,
    mapDispatchToVisibleTodoListProps
    // passing target component as a parameter for function
)(TodoList);

let nextTodoId = 0;

// application component
// container component for app
const TodoApp = () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
);
TodoApp.contextTypes = {
    store: PropTypes.object
};

// combination of reducers
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

// inject store as a parameter for top level component
ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);