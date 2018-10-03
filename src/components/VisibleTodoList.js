import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import {getVisibleTodos, getErrorMessage, getIsFetching} from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

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
        const {filter, fetchTodos} = this.props;
        // getting filter property from mounted props by mapStateToProps function
        // also possible to make something after async call as it returns promise
        fetchTodos(filter)/*.then(() => console.log('done async'))*/;
    }

    render() {
        // extracting toggleTodo as its name not equals to name of target prop
        // passing rest of properties as is
        const {toggleTodo, errorMessage, todos, isFetching} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }

        if (errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                />
            );
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
        // getting error message to display
        errorMessage: getErrorMessage(state, filter),
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