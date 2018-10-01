import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import {getVisibleTodos} from '../reducers';
import TodoList from './TodoList';
import {fetchTodos} from "../api";

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
        const {filter, receiveTodos} = this.props;
        // getting filter property from mounted props by mapStateToProps function
        fetchTodos(filter).then(todos =>
            receiveTodos(filter, todos)
        );
    }

    render() {
        // extracting toggleTodo as its name not equals to name of target prop
        // passing rest of properties as is
        const {toggleTodo, ...rest} = this.props;
        return (
            <TodoList
                {...rest}
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