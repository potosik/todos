import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import {getVisibleTodos, getIsFetching} from '../reducers';
import TodoList from './TodoList';

class VisibleTodoList extends React.Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, requestTodos, fetchTodos} = this.props;
        // reducing the request todos action to set state of loading
        requestTodos(filter);
        // getting filter property from mounted props by mapStateToProps function
        fetchTodos(filter);
    }

    render() {
        // extracting toggleTodo as its name not equals to name of target prop
        // passing rest of properties as is
        const {toggleTodo, todos, isFetching} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }

        return (
            <TodoList
                todos={todos}
                onTodoClick={toggleTodo}/>
        );
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
        // calculating if fetching is in progress
        isFetching: getIsFetching(state, filter),
        // to get filter inside of VisibleTodoList component created above
        filter
    }
};
// auto-generated container component for mapping state and
// dispatch function to target component
VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
    // passing target component as a parameter for function
)(VisibleTodoList));

export default VisibleTodoList;