import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Example = (props) => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Habito!</h1>
                <p className="lead">"Depending on what they are, our habits will either make us or break us. We become what we repeatedly do.” ―Sean Covey</p>
                <hr className="my-2" />
                <p>Let's build your habit together with our community!</p>
                <p className="lead">
                    <Button color="primary" tag={Link} to="/register">Get Started!</Button>
                </p>
            </Jumbotron>
        </div>
    );
};

export default Example;