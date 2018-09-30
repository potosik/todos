import React from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

// application component
// container component for app
// match provided by router
const App = ({match}) => (
    <div>
        <AddTodo/>
        <VisibleTodoList
            // get filter from match.params by router
            // 'all' as default
            filter={match.params.filter || 'all'}
        />
        <Footer/>
    </div>
);

export default App;