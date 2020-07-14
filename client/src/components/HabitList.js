import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Spinner,
    Card,
    Button,
    CardHeader,
    CardFooter,
    CardBody,
    CardTitle,
    CardText,
    Badge,
    Progress
} from 'reactstrap';
import { getHabits } from '../utils/api';

const HabitList = (props) => {

    const { userDetails } = props;

    const [habitList, setHabitList] = useState([]);

    /**
    * @description function to fetch all Habits of the user
    */
    async function fetchUsers() {
        const response = await getHabits(userDetails.id);
        console.log(response);
        if (response.status === 200) {
            setHabitList(response.data);
        }
        else {
            // onError(response.data)
            alert('Some Error occured! Try again');
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const calculatePercentage = (streak) => {
        streak = streak >= 21 ? 21 : streak;
        return (streak / 21) * 100;
    }

    if (habitList.length === 0) {
        return (
            <Container className="mt-5 mt-3 d-flex justify-content-center">
                <h2>No habits added, add habits to view!</h2>
            </Container>)
    }

    return (
        <Container className="mt-5">
            {/* <Spinner style={{ width: '3rem', height: '3rem' }} className="mt-3  align-items-center" /> */}
            {habitList.map((habit) =>
                <Card key={habit._id} className="mb-4">
                    <CardHeader>{habit.tag} {habit.isCompleted === true && <Badge color="success">Acquired</Badge>}</CardHeader>
                    <CardBody>
                        <CardTitle>Description:</CardTitle>
                        <CardText>{habit.desc}</CardText>
                        <CardTitle>Streak: <Badge color="primary">{habit.streak} of 21 days</Badge></CardTitle>
                        <Progress value={calculatePercentage(habit.streak)} className="mb-3">{calculatePercentage(habit.streak)}%</Progress>
                        <Button>Update Streak for Today</Button>
                    </CardBody>
                </Card>
            )}

        </Container>
    )
}

export default HabitList;