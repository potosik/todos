import React from 'react';
import PropTypes from 'prop-types';

// presentational component to display a single todo
const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            // add some styles to see the changes
            textDecoration: completed ? 'line-through' : 'none'
        }}>
        {text}
    </li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default Todo;