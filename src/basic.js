import { createStore } from 'redux';

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
}

// creating store
const store = createStore(counter);

// renderer
const render = () => {
    document.getElementById('root').innerText = store.getState();
};

// subscribe for changes
store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
});