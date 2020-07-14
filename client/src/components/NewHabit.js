import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, CardHeader, Card } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { addHabit } from '../utils/api';

const NewHabit = (props) => {

    const { userDetails } = props;

    /**
    * @description state to store data of input fields
    */
    const [habitDetails, setHabitDetails] = useState({
        tag: '',
        desc: '',
        isCompleted: false,
        streak: 0,
        reminder: ''
    })

    /**
    * @description state to manage redirect to home page
    */
    const [toMyHabits, setToMyHabits] = useState(false);

    /**
    * @description function to handle change on input fields
    */

    const handleChange = (e, field) => {
        switch (field) {
            case 'tag':
                setHabitDetails({
                    ...habitDetails,
                    tag: e.target.value,
                })
                break;

            case 'desc':
                setHabitDetails({
                    ...habitDetails,
                    desc: e.target.value,
                })
                break;

            case 'reminder':
                setHabitDetails({
                    ...habitDetails,
                    reminder: e.target.value,
                })
                break;

            default:
                setHabitDetails(habitDetails)
        }

    }

    /**
    * @description function to handle submit
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addHabit({
            id: userDetails.id,
            habit: habitDetails,
        })
        if (response.status === 200) {
            setToMyHabits(true);
        }
        else {
            alert('Some error occured while adding new habit, please try again');
        }
    }

    if (toMyHabits) {
        return <Redirect to="/my-habits" />
    }

    return (
        <Container className="mt-5">
            <Card>
                <CardHeader>Add New Habit</CardHeader>
                <Form onSubmit={handleSubmit} className="ml-4 mr-4 mb-4 mt-4">
                    <FormGroup>
                        <Label for="tag">Tag</Label>
                        <Input
                            required
                            type="text"
                            name="tag"
                            id="tag"
                            value={habitDetails.tag}
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
                            value={habitDetails.desc}
                            placeholder="Name of the habit to be acquired"
                            onChange={(e) => handleChange(e, 'desc')}
                            maxLength="300"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="reminder">Set Reminder Time</Label>
                        <Input
                            required
                            type="time"
                            name="reminder"
                            id="reminder"
                            placeholder="Set Reminder Time"
                            onChange={(e) => handleChange(e, 'reminder')}
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

export default NewHabit;
