import React from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

// application component
// container component for app
const App = () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
);

export default App;