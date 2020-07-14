import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HabitList = () => {

    const [habitList, setHabitList] = useState({});

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

    return (
        <h1>Habitlist</h1>
    )
}

export default HabitList;