import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { getUsers } from '../utils/api';


const HabitList = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
    * @description function to fetch all users
    */
    async function fetchUsers() {
        await setLoading(true)
        const response = await getUsers();
        if (response.status === 200) {
            setUsers(response.data);
            setLoading(false);
        }
        else {
            alert('Some Error occured! Try again');
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <Container className="mt-5 mt-3 d-flex justify-content-center">
                <Spinner style={{ width: '3rem', height: '3rem' }} className="mt-3  align-items-center" />
            </Container>
        )
    }

    return (
        <Container className="mt-5">
            {users.map((user, index) =>
                <Card key={user._id} className="mb-4">
                    <CardHeader><h3><Badge color="info">{user.name} <Badge color="light">{index + 1}</Badge></Badge></h3></CardHeader>
                    <CardBody>
                        <CardTitle>Reward Points: <Badge color="success">{user.rewardPoints}</Badge></CardTitle>

                    </CardBody>
                </Card>
            )}

        </Container>
    )
}

export default HabitList;