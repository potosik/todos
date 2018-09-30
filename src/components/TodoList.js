import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

// presentational component to display a list of todos
const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}/>
        )}
    </ul>
);

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;