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

// creating store
const createStore = (reducer) => {
    let state;
    let listeners = [];

    // getting current state
    const getState = () => state;

    // dispatching an action
    const dispatch = (action) => {
        // create a new state with action
        state = reducer(state, action);
        // notify all listeners
        listeners.forEach(listener => listener());
    };

    // subscribing listeners
    const subscribe = (listener) => {
        listeners.push(listener);
        // return function to unsubscribe
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    // creating initial state
    dispatch({});

    return {getState, dispatch, subscribe};
};

const store = createStore(counter);

// renderer
const render = () => {
    document.getElementById('root').innerText = store.getState();
};

// subscribe for changes
store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
});