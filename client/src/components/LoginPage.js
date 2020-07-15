import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardHeader, CardBody, CardTitle, Alert, Container, Spinner } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { authenticateUser } from '../utils/api';


const Login = (props) => {

    /**
    * @description state to store credentials of the user
    */
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);

    /**
    * @description state to manage redirect to home page
    */
    const [toHome, setToHome] = useState(false);

    /**
    * @description state to manage invalid credentials message
    */
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    /**
    * @description function to handle changes in the input fields
    */
    const handleChange = (e, field) => {
        if (field === 'email') {
            setLoginDetails({
                ...loginDetails,
                email: e.target.value
            })
        }

        if (field === 'password') {
            setLoginDetails({
                ...loginDetails,
                password: e.target.value
            })
        }
    }

    /**
    * @description function to handle submit
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await authenticateUser(loginDetails);
        if (response.status === 200) {
            props.updateAuthedUser(response.data);
            setLoading(false);
            setToHome(true);
        }
        else {
            setInvalidCredentials(true);
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Container className="mt-5 mt-3 d-flex justify-content-center">
                <Spinner style={{ width: '3rem', height: '3rem' }} className="mt-3  align-items-center" />
            </Container>
        )
    }

    if (toHome) {
        return <Redirect to="/" />
    }

    return (
        <Card style={{ width: "50rem" }}>
            {invalidCredentials === true && <Alert color="danger">Invalid email or password</Alert>}
            <CardHeader as="h5" style={{ backgroundColor: "#343A40", color: "#FFF" }}>Login</CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={loginDetails.email}
                            onChange={(e) => handleChange(e, 'email')}
                            placeholder="Enter email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            required
                            type="password"
                            name="password"
                            id="password"
                            value={loginDetails.password}
                            onChange={(e) => handleChange(e, 'password')}
                            placeholder="Enter password"
                        />
                    </FormGroup>
                    <Button className="mb-2">Submit</Button>
                </Form>
                <Link to={`/register`} style={{ color: "black", textDecoration: "underline" }}>
                    Not an existing user, Register here!
                </Link>
            </CardBody>
        </Card>
    );
}

export default Login;
