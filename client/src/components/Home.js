import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    CardHeader,
    CardFooter,
    CardBody,
    CardTitle,
    CardText,
    Container,
    Badge,
    Spinner
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { getPosts, likePost } from '../utils/api';

const Home = (props) => {
    const { userDetails } = props;

    /**
    * @description state to manage the spinner to display loading
    */
    const [loading, setLoading] = useState(true);

    /**
    * @description state to store the posts
    */
    const [posts, setPosts] = useState([]);


    /**
    * @description to load the posts
    */
    useEffect(() => {
        async function getPostList() {
            await setLoading(true);
            const response = await getPosts();
            if (response.status === 200) {
                setPosts(response.data)
            }
            else {
                alert('some error occured while fetching all the posts, please try again');
            }
            await setLoading(false);

        }
        getPostList();
    }, [])


    /**
    * @description function to like post
    */
    const onLike = async (id) => {
        let postsObj = [];
        for (const index in posts) {
            if (id === posts[index]._id) {
                posts[index].likes += 1;
            }
            postsObj.push(posts[index]);
        }
        setPosts(postsObj);
        const response = await likePost(id);
        if (response.status !== 200) {
            alert('error while liking the post, please try again');
            for (const index in posts) {
                if (id === posts[index]._id) {
                    posts[index].likes -= 1;
                }
                postsObj.push(posts[index]);
            }
            setPosts(postsObj);
        }
    }

    if (loading) {
        return (
            <Container className="mt-5 mt-3 d-flex justify-content-center">
                <Spinner style={{ width: '3rem', height: '3rem' }} className="mt-3  align-items-center" />
            </Container>
        )
    }

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
                            <CardHeader className="bg-info text-white">Stats</CardHeader>
                            <CardBody>
                                <CardTitle>Habits Added: <Badge color="success">{userDetails.habits.length}</Badge></CardTitle>
                                <CardTitle>Acquired Habits: <Badge color="success">{userDetails.completed}</Badge></CardTitle>
                                <Button tag={Link} to="/my-habits">Update</Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-5 col-sm-12 pl-0 pr-0 mb-3 mr-4">
                        {posts.map((post) =>
                            <Card className="mb-4" key={post._id}>
                                <CardHeader>{post.tag}</CardHeader>
                                <CardBody>
                                    <CardTitle>{post.author} says:</CardTitle>
                                    <CardText>{post.desc}</CardText>
                                </CardBody>
                                <CardFooter>
                                    <Button size="sm" color="danger" onClick={() => onLike(post._id)}>Like {post.likes > 0 && <Badge color="light" size="bg">{post.likes}</Badge>}</Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                    <div className="col-md-3 col-sm-12 pl-0 pr-0 mr-4">
                        <Card >
                            <CardHeader className="bg-info text-white">Reward Points</CardHeader>
                            <CardBody>
                                <CardTitle>Reward Points Earned: <Badge color="success">{userDetails.rewardPoints}</Badge></CardTitle>
                                <CardText>You gain 10 points on each login and 500 points on acquiring a new Habit! Earn more points to top the leaderboard.</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Container >
        )
    );
};

export default Home;