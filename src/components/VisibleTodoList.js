import {connect} from 'react-redux';
import {toggleTodo} from '../actions';
import {withRouter} from 'react-router';
import TodoList from './TodoList';
import React from "react";

// helper to filter available todos
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
    }
};

// returns props that is depends on store
// maps store state to the props of component
const mapStateToVisibleTodoListProps = (state, {match}) => ({
    // get filter from match.params by router
    // 'all' as default
    todos: getVisibleTodos(state.todos, match.params.filter || 'all')
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
const VisibleTodoList = withRouter(connect(
    mapStateToVisibleTodoListProps,
    mapDispatchToVisibleTodoListProps
    // passing target component as a parameter for function
)(TodoList));

export default VisibleTodoList;