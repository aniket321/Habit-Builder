import React, { useState } from 'react';
import {
    Card,
    Button,
    CardHeader,
    CardFooter,
    CardBody,
    CardTitle,
    CardText,
    Container,
    Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const { userDetails } = props;

    if (!userDetails) {
        return <h3>Something went wrong, Please reload</h3>
    }

    return (
        userDetails &&
        (
            <Container style={{ width: "90%" }}>
                <div className="row mt-5">
                    <div className="col-md-3 col-sm-12 pl-0 pr-0 mb-3 mr-4">
                        <Card>
                            <CardHeader>Stats</CardHeader>
                            <CardBody>
                                <CardTitle>Habits Added: <Badge color="primary">{userDetails.habits.length}</Badge></CardTitle>
                                <CardTitle>Acquired Habits: <Badge color="primary">{userDetails.completed}</Badge></CardTitle>
                                <Button tag={Link} to="/my-habits">Update</Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-5 col-sm-12 pl-0 pr-0 mb-3 mr-4">
                        <Card>
                            <CardHeader>Header</CardHeader>
                            <CardBody>
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button>Go somewhere</Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-3 col-sm-12 pl-0 pr-0 mr-4">
                        <Card >
                            <CardHeader>Reward Points</CardHeader>
                            <CardBody>
                                <CardTitle>Reward Points Earned: <Badge color="success">{userDetails.rewardPoints}</Badge></CardTitle>
                                <CardText>You gain 10 points on each login and 500 points on acquiring a new Habit! Earn more points to top the leaderboard</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Container >
        )
    );
};

export default Home;