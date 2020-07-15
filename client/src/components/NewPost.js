import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, CardHeader, Card } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { sharePost } from '../utils/api';

const NewPost = (props) => {

    const { userDetails } = props;
    const { tag } = props.location.state;

    /**
    * @description state to store data of input fields
    */
    const [postDetails, setPostDetails] = useState({
        tag: tag,
        author: userDetails.name,
        likes: 0,
        desc: ''
    })

    /**
    * @description state to manage redirect to home page
    */
    const [toHome, setToHome] = useState(false);

    /**
    * @description function to handle change on input fields
    */

    const handleChange = (e, field) => {
        switch (field) {
            case 'desc':
                setPostDetails({
                    ...postDetails,
                    desc: e.target.value,
                })
                break;

            default:
                setPostDetails(postDetails)
        }

    }

    /**
    * @description function to handle submit
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await sharePost(postDetails);
        if (response.status === 201) {
            setToHome(true);
        }
        else {
            alert('Some error occured while sharing post, please try again');
        }
    }

    if (toHome) {
        return <Redirect to="/" />
    }

    return (
        <Container className="mt-5">
            <Card>
                <CardHeader>Share</CardHeader>
                <Form onSubmit={handleSubmit} className="ml-4 mr-4 mb-4 mt-4">
                    <FormGroup>
                        <Label for="tag">Tag</Label>
                        <Input
                            disabled
                            required
                            type="text"
                            name="tag"
                            id="tag"
                            value={postDetails.tag}
                            placeholder="Name of the habit to be acquired"
                            onChange={(e) => handleChange(e, 'tag')}
                            maxLength="30"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="desc">Description</Label>
                        <Input
                            required
                            type="textarea"
                            name="desc"
                            id="desc"
                            value={postDetails.desc}
                            placeholder="Let others know how you did it!"
                            onChange={(e) => handleChange(e, 'desc')}
                            maxLength="300"
                        />
                    </FormGroup>

                    <Button color="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}

export default NewPost;
