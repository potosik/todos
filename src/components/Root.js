import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/:filter?" component={App}/>
            </div>
        </BrowserRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;