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

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-6">
                <Container>
                    <NavbarBrand href="/">Habito</NavbarBrand>
                    <NavbarToggler onClick={toggleHamBurger} />
                    <Collapse isOpen={hamBurgerState} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="#">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="">Add Habit</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="">My Habits</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="">LeaderBoard</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText className="mr-4">Hi, Your name</NavbarText>
                        <Form inline>
                            <Button color="success" onClick={logout} href="/">Logout</Button>
                        </Form>
                        <Form inline>
                            <Button color="success" href="/login">Login</Button>
                        </Form>
                        <Form inline>
                            <Button color="success" href="/register">Register</Button>
                        </Form>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavBar;