import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

// counter reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(counter);

// Counter component
const Counter = ({
    // passing parameters here
    value,
    onIncrement,
    onDecrement
}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
)

// renderer
const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()}
                 onIncrement={() =>
                     store.dispatch({
                         type: "INCREMENT"
                     })}
                 onDecrement={() =>
                     store.dispatch({
                         type: "DECREMENT"
                     })}/>,
        document.getElementById('root')
    );
};

// subscribe for changes
store.subscribe(render);
render();