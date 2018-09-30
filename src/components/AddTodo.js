import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

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
                dispatch(addTodo(input.value));
                // clear input
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};

AddTodo.propTypes = {
    dispatch: PropTypes.func.isRequired,
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

export default connect()(AddTodo);