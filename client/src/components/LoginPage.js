import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'



const Login = (props) => {

    /**
    * @description state to store credentials of the user
    */
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    })

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
        console.log(loginDetails);

    }

    return (
        <Card>
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
                    <Button>Submit</Button>
                </Form>
                <Link to={`/register`} style={{ color: "black", textDecoration: "underline" }}>
                    Not an existing user, Register here!
                </Link>
            </CardBody>
        </Card>
    );
}

export default Login;
