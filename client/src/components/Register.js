import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

const Register = () => {

    /**
    * @description state to store data of input fields
    */
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        rewardPoints: 0,
        completed: 0
    })

    /**
    * @description state to manage redirect to home page
    */

    /**
    * @description function to handle change on input fields
    */
    const handleChange = (e, field) => {
        switch (field) {
            case 'name':
                setUserDetails({
                    ...userDetails,
                    name: e.target.value,
                })
                break;

            case 'email':
                setUserDetails({
                    ...userDetails,
                    email: e.target.value,
                })
                break;

            case 'mobile':
                setUserDetails({
                    ...userDetails,
                    mobile: e.target.value,
                })
                break;

            case 'password':
                setUserDetails({
                    ...userDetails,
                    password: e.target.value,
                })
                break;

            default:
                setUserDetails(userDetails)
        }

    }

    /**
    * @description function to handle submit
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userDetails)

    }

    return (
        <Card style={{ width: "50rem" }}>
            <CardHeader as="h5" style={{ backgroundColor: "#343A40", color: "#FFF" }}>Register</CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>

                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            required
                            type="name"
                            name="name"
                            id="name"
                            value={userDetails.name}
                            onChange={(e) => handleChange(e, 'name')}
                            placeholder="Enter Name"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={userDetails.email}
                            onChange={(e) => handleChange(e, 'email')}
                            placeholder="Enter email"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="mobile">Mobile Number</Label>
                        <Input
                            required
                            pattern="[0-9]*"
                            type="text"
                            name="mobile"
                            id="mobile"
                            value={userDetails.mobile}
                            onChange={(e) => handleChange(e, 'mobile')}
                            placeholder="Enter Mobile Number"
                            maxLength="10"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            required
                            type="password"
                            name="password"
                            id="password"
                            value={userDetails.password}
                            onChange={(e) => handleChange(e, 'password')}
                            placeholder="Enter password"
                            minLength="8"
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <Link to={`/`} style={{ color: "black", textDecoration: "underline" }}>
                    Go Home!
                </Link>
            </CardBody>
        </Card>
    );
}

export default Register;
