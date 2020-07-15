import React from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Container className="mt-5 mt-3 d-flex justify-content-center">
            <h3>The path you are looking for does not exist <Link to="/">Go Home!</Link></h3>
        </Container>
    )
}

export default Error;