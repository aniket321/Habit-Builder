import React, { useState, useEffect } from 'react';
import {
    Container,
    Spinner,
    Card,
    Button,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Badge,
    Progress
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getHabits, incrementStreak } from '../utils/api';


const HabitList = (props) => {

    const { userDetails } = props;

    /**
   * @description state to store the habits of user
   */
    const [habitList, setHabitList] = useState([]);


    /**
   * @description state to manage the spinner to display loading
   */
    const [loading, setLoading] = useState(true);

    /**
    * @description function to fetch all Habits of the user
    */
    async function fetchUsers() {
        await setLoading(true)
        const response = await getHabits(userDetails.id);
        if (response.status === 200) {
            setHabitList(response.data);
            setLoading(false);
        }
        else {
            alert('Some Error occured! Try again');
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

     /**
    * @description function to calculate the percentage of the progress bar
    */
    const calculatePercentage = (streak) => {
        streak = streak >= 21 ? 21 : streak;
        return Math.floor((streak / 21) * 100);
    }

     /**
    * @description function to update the streak of habit
    */
    const updateStreak = async (habitId) => {
        let habitsObj = [];
        for (const index in habitList) {
            if (habitId === habitList[index]._id) {
                habitList[index].streak += 1;
                if (habitList[index].streak === 21) {
                    habitList[index].isCompleted = true;
                }
            }
            habitsObj.push(habitList[index]);
        }
        setHabitList(habitsObj);
        const response = await incrementStreak(habitId, userDetails.id);
        if (response.status !== 200) {
            alert('Error occured while updating, please try again');
            for (const index in habitList) {
                if (habitId === habitList[index]._id) {
                    habitList[index].streak -= 1;
                }
                habitsObj.push(habitList[index]);
            }
            setHabitList(habitsObj);
        }
    }

    if (loading) {
        return (
            <Container className="mt-5 mt-3 d-flex justify-content-center">
                <Spinner style={{ width: '3rem', height: '3rem' }} className="mt-3  align-items-center" />
            </Container>
        )
    }

    if (habitList.length === 0) {
        return (
            <Container className="mt-5 mt-3 d-flex justify-content-center">
                <h2>No habits added, add habits to view!</h2>
            </Container>)
    }

    return (
        <Container className="mt-5">
            {habitList.map((habit) =>
                <Card key={habit._id} className="mb-4">
                    <CardHeader>{habit.tag} {habit.isCompleted === true && <Badge color="success">Acquired</Badge>}</CardHeader>
                    <CardBody>
                        <CardTitle>Description:</CardTitle>
                        <CardText>{habit.desc}</CardText>
                        <CardTitle>Streak: <Badge color="primary">{habit.streak} of 21 days</Badge></CardTitle>
                        <Progress value={calculatePercentage(habit.streak)} className="mb-3">{calculatePercentage(habit.streak)} %</Progress>
                        <Button onClick={() => updateStreak(habit._id)}>Update Streak for Today</Button>
                        {habit.isCompleted === true &&
                            <Button
                                tag={Link}
                                to={
                                    {
                                        pathname: "/share",
                                        state: {
                                            tag: habit.tag
                                        }
                                    }
                                }
                                className="ml-3"
                            >
                                Share
                            </Button>}
                    </CardBody>
                </Card>
            )}

        </Container>
    )
}

export default HabitList;