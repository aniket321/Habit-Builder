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


const AppNavBar = () => {
    const [hamBurgerState, setHamBurgerState] = useState(false);

    const toggleHamBurger = () => {
        setHamBurgerState(!hamBurgerState);
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
                            <Button color="success">Logout</Button>
                        </Form>
                        <Form inline>
                            <Button color="success" href="/login">Login</Button>
                        </Form>
                        <Form inline>
                            <Button color="success" as={Link} to="/register">Register</Button>
                        </Form>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavBar;