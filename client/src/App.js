import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppNavBar from './components/AppNavBar';
import Home from './components/Home';
import NewHabit from './components/NewHabit';
import HabitList from './components/HabitList';
import Landing from './components/Landing';
import Login from './components/LoginPage';


function App() {

    const [authedUser, setAuthedUser] = useState({
        id: null,
    })

    return (
        <Router>
            {authedUser.id === null ? (
                <div>
                    <Switch>
                        <>
                            <AppNavBar />
                            <Container className="mt-3">
                                <Route exact path="/" component={Landing} />
                                <Route exact path='/login' render={() => (
                                    <Login
                                    />
                                )}
                                />
                                {/* <Route exact path="/register" component={Register} /> */}
                            </Container>
                        </>
                    </Switch>
                </div>
            ) : (
                    <>
                        <AppNavBar />
                        <div className="tab-container">
                            <Switch>
                                <Route exact path='/' render={() => (
                                    <Home

                                    />
                                )}
                                />
                                <Route exact path='/add' render={() => (
                                    <NewHabit

                                    />
                                )}
                                />
                                <Route exact path='/my-habits' render={({ location }) => (
                                    <HabitList

                                    />
                                )}
                                />
                                {/* <Route component={Error} /> */}
                            </Switch>
                        </div>
                    </>
                )}

        </Router>
    );
}

export default App;
