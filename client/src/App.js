import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavBar from './components/AppNavBar';
import Home from './components/Home';
import NewHabit from './components/NewHabit';
import HabitList from './components/HabitList';

function App() {
    return (
        <div className="App">
            <AppNavBar />
            {/* <Home /> */}
            {/* <NewHabit /> */}
            <HabitList />
        </div>
    );
}

export default App;
