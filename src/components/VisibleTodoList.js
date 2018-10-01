import React from 'react';
import {connect} from 'react-redux';
import {toggleTodo} from '../actions';
import {withRouter} from 'react-router';
import {getVisibleTodos} from '../reducers';
import TodoList from './TodoList';
import {fetchTodos} from "../api";

class VisibleTodoList extends React.Component {
    componentDidMount() {
        // getting filter property from mounted props by mapStateToProps function
        fetchTodos(this.props.filter).then(todos =>
            console.log(this.props.filter, todos)
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            // getting filter property from mounted props by mapStateToProps function
            fetchTodos(this.props.filter).then(todos =>
                console.log(this.props.filter, todos)
            );
        }
    }

    render() {
        return <TodoList {...this.props}/>;
    }
}

// returns props that is depends on store
// maps store state to the props of component
const mapStateToProps = (state, {match}) => {
    const filter = match.params.filter || 'all';
    return {
        // get filter from match.params by router
        // 'all' as default
        todos: getVisibleTodos(state, filter),
        // to get filter inside of VisibleTodoList component created above
        filter
    }
};
// auto-generated container component for mapping state and
// dispatch function to target component
VisibleTodoList = withRouter(connect(
    mapStateToProps,
    {onTodoClick: toggleTodo}
    // passing target component as a parameter for function
)(VisibleTodoList));

export default VisibleTodoList;