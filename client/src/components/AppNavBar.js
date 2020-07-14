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
                        <NavbarText>Hi, Your name</NavbarText>
                        <Form inline>
                            <Button color="success" className="ml-4">Logout</Button>
                        </Form>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavBar;