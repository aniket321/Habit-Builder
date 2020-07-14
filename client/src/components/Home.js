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

const Home = () => {
    return (
        <Container style={{ width: "90%" }}>
            <div className="row mt-5">
                <div className="col-md-3 col-sm-12 pl-0 pr-0 mb-3">
                    <Card style={{ width: "16rem" }}>
                        <CardHeader>Stats</CardHeader>
                        <CardBody>
                            <CardTitle>Habits Added: <Badge color="primary">4</Badge></CardTitle>
                            <CardTitle>Acquired Habits: <Badge color="primary">3</Badge></CardTitle>
                            <Button>Update</Button>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-5 col-sm-12 pl-0 pr-0 mb-3">
                    <Card>
                        <CardHeader>Header</CardHeader>
                        <CardBody>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-3 col-sm-12 pl-0 pr-0 ml-4">
                    <Card >
                        <CardHeader>Reward Points</CardHeader>
                        <CardBody>
                            <CardTitle>Reward Points Earned: <Badge color="success">100</Badge></CardTitle>
                            <CardText>You gain 10 points on each login and 500 points on acquiring a new Habit!</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Container >
    );
};

export default Home;