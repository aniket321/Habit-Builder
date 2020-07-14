import React, { useState } from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Container
} from 'reactstrap';

const Home = () => {
    return (
        <Container style={{ width: "90%" }}>
            <div className="row mt-5">
                <div className="col-md-3 col-sm-12 pl-0 pr-0 mb-3">
                    <Card style={{ width: "16rem" }}>
                        <CardHeader>Stats</CardHeader>
                        <CardBody>
                            <CardTitle>Habits Added: 3</CardTitle>
                            <CardTitle>Acquired Habits: 3</CardTitle>
                            <Button>Update</Button>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-5 col-sm-12 pl-0 pr-0 mb-3">
                    <Card >
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
                            <CardTitle>Reward Points Earned: 100</CardTitle>
                            <CardText>You gain 10 points on each login and 500 points on acquiring a new Habit!</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Container >
    );
};

export default Home;