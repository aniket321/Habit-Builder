import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavBar from './components/AppNavBar';
import Home from './components/Home'

function App() {
    return (
        <div className="App">
            <AppNavBar />
            <Home />
        </div>
    );
}

export default App;
