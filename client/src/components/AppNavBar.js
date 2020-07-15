import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Form,
    Button,
    NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';


const AppNavBar = (props) => {

    const { userDetails } = props;

    const [hamBurgerState, setHamBurgerState] = useState(false);

    const toggleHamBurger = () => {
        setHamBurgerState(!hamBurgerState);
    }

    /**
    * @description function to handle logout button
    */
    const logout = () => {
        props.handleLogout();
    }

    // if (!userDetails) {
    //     return <h1>Something went wrong, Please reload</h1>
    // }

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-6">
                <Container>
                    <NavbarBrand tag={Link} to="/">Habito</NavbarBrand>
                    <NavbarToggler onClick={toggleHamBurger} />
                    <Collapse isOpen={hamBurgerState} navbar>
                        {userDetails !== null ?
                            (
                                <>
                                    <Nav className="mr-auto" navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to="/">Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/add">Add Habit</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/my-habits">My Habits</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/leaderboard">LeaderBoard</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <NavbarText className="mr-4">Hi, {userDetails.name}</NavbarText>
                                    <Form inline>
                                        <Button color="success" onClick={logout} href="/">Logout </Button>
                                    </Form>
                                </>
                            ) :
                            (
                                <Nav className="ml-auto" navbar>
                                    <Form inline>
                                        <Button color="success" href="/login" className="mb-1 mr-2">Login</Button>
                                    </Form>
                                    <Form inline>
                                        <Button color="success" href="/register" className="mb-1">Register</Button>
                                    </Form>
                                </Nav>
                            )
                        }

                    </Collapse>
                </Container>
            </Navbar>
        </div>

    )
}

export default AppNavBar;