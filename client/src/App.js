import React, { useState, useEffect } from 'react';
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
import Register from './components/Register';

import { getAuthedUser, getUserDetails, setLocalStorage } from './utils/api';


function App() {

    const [authedUser, setAuthedUser] = useState({
        id: null,
    })


    const [userDetails, setUserDetails] = useState(null)


    useEffect(() => {
        async function getUser() {
            let user = await getAuthedUser();
            await setAuthedUser(user);
            if (user.id === null) {
                await setUserDetails(null);
            }
            else {
                let userInfo = await getUserDetails(user.id);
                await setUserDetails(userInfo);
            }

        }
        getUser();
    }, [])


    /**
    * @description function to update state when user clicks on login button
    */

    const updateAuthedUser = async (response) => {
        let user = {
            id: response.id,
        }
        await setAuthedUser(user);
        await setUserDetails(response);
        await setLocalStorage(user);
    }

    /**
    * @description function to clear the state when user clicks on logout button
    */
    const handleLogout = async () => {
        let user = {
            id: null,
        }
        setAuthedUser(user);
        setUserDetails(null);
        setLocalStorage(user);
    }

    return (
        <Router>
            {authedUser.id === null || userDetails === null ? (
                <div>
                    <Switch>
                        <>
                            <AppNavBar />
                            <Container className="mt-3 d-flex justify-content-center">
                                <Route exact path="/" component={Landing} />
                                <Route exact path='/login' render={() => (
                                    <Login
                                        updateAuthedUser={updateAuthedUser}
                                    />
                                )}
                                />
                                <Route exact path="/register" component={Register} />
                            </Container>
                        </>
                    </Switch>
                </div>
            ) : (
                    <>
                        <AppNavBar handleLogout={handleLogout} />
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
