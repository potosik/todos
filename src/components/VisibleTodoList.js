import {connect} from 'react-redux';
import {toggleTodo} from '../actions';
import {withRouter} from 'react-router';
import {getVisibleTodos} from '../reducers';
import TodoList from './TodoList';

// returns props that is depends on store
// maps store state to the props of component
const mapStateToProps = (state, {match}) => ({
    // get filter from match.params by router
    // 'all' as default
    todos: getVisibleTodos(state, match.params.filter || 'all')
});
// auto-generated container component for mapping state and
// dispatch function to target component
const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
    // passing target component as a parameter for function
)(TodoList));

export default VisibleTodoList;