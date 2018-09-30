import {connect} from 'react-redux';
import {toggleTodo} from '../actions';
import TodoList from './TodoList';

// helper to filter available todos
const getVisibleTodos = (todos, filter) => {
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
const mapStateToVisibleTodoListProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
// returns functions that is calls dispatch of the store
// maps dispatch method of the store to the action methods of component
const mapDispatchToVisibleTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id));
    }
});
// auto-generated container component for mapping state and
// dispatch function to target component
const VisibleTodoList = connect(
    mapStateToVisibleTodoListProps,
    mapDispatchToVisibleTodoListProps
    // passing target component as a parameter for function
)(TodoList);

export default VisibleTodoList;