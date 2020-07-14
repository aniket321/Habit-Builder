import axios from 'axios';
const baseUrl = 'http://localhost:5000/api/users';


/**
* @description function to authenticate user
*/
export const authenticateUser = async (credentials) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, {
            email: credentials.email,
            password: credentials.password,
        })
        return response;
    }
    catch (error) {
        return error.response;
    }
}


/**
* @description function to register a user
*/
export const registerUser = async (userDetails) => {
    try {
        const response = await axios.post(baseUrl, userDetails)
        return response;
    }
    catch (error) {
        return error.response;
    }
}


/**
* @description function to get the loggedin user from the localstorage
*/
export const getAuthedUser = async () => {
    try {
        let authedUser = localStorage.getItem('authedUser');
        if (authedUser === null) {
            let user = {
                id: null
            }
            await setLocalStorage(user);
            return user;
        }
        else {
            return JSON.parse(authedUser);
        }
    }
    catch (error) {
        alert('Some error occured! Try again');
    }
}

/**
* @description function to get details of particular user
*/
export const getUserDetails = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`)
        return response.data;
    }
    catch (error) {
        return error.response;
    }
}


/**
* @description function to incremet streak of habit
*/
export const incrementStreak = async (habitId, userId) => {
    console.log(userId)
    try {
        const response = await axios.post(`${baseUrl}/increment/${habitId}`, {
            id: userId
        })
        return response;
    }
    catch (error) {
        return error.response;
    }
}


/**
* @description function to add a new habit
*/
export const addHabit = async (habitDetails) => {
    console.log(habitDetails)
    try {
        const response = await axios.post(`${baseUrl}/new`, habitDetails);
        return response;
    }
    catch (error) {
        return error.response;
    }
}


/**
* @description function to habits of a particular user
*/
export const getHabits = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/habits/${id}`);
        return response;
    }
    catch (error) {
        return error.response;
    }
}


/**
* @description function to set the localstorage
*/
export const setLocalStorage = async (user) => {
    try {
        await localStorage.clear();
        return localStorage.setItem('authedUser', JSON.stringify(user));
    }
    catch (error) {
        alert('Some error occured! Try again');
    }
}

/**
* @description function to clear the localstorage
*/

export const clearLocalStorage = () => {
    return localStorage.clear();
}

