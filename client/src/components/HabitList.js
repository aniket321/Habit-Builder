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

const HabitList = () => {

    const [habitList, setHabitList] = useState([]);

    /**
    * @description function to fetch all Habits of the user
    */
    async function fetchUsers() {
        const response = await axios.get('http://localhost:5000/api/users/habits/5f0d5b6fdd2cc532e92610ba');
        if (response.status === 200) {
            console.log(response.data)
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

    return (
        <Container className="mt-5">
            {/* <Spinner style={{ width: '3rem', height: '3rem' }} /> */}
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