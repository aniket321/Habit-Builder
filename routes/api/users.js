const express = require('express');
const router = express.Router();

//Users model
const User = require('../../models/Users');

//routes

//@ GET    /api/users
//@ DESC:- will send back the result of all user
//@ Access:-public
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }

})



//@ POST     /api/users
//@ DESC:-   will register a user and save it
//@ Access:- public
router.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({ user, message: "Registered Successfully! Please login to continue" })

    } catch (e) {
        res.status(400).send({ e, message: "Some error occured, please try again" })
    }
})



//@ POST     /api/users
//@ DESC:-   will authenticate a user 
//@ Access:- public
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // increase the reward points
        res.send({ user })
    } catch (e) {
        res.status(401).send({ message: "Invalid email or password" })
    }
})



//@ POST     /api/users/new
//@ DESC:-   adds a new habit to habit list of a user
//@ Access:- private
router.post('/new', async (req, res) => {
    const userId = req.body.id;
    const habit = req.body.habit;
    const user = await User.findById(userId)
    try {
        user.habits = user.habits.concat(habit)
        await user.save();
        res.send({ user })
    } catch (e) {
        res.status(500).send({ e, message: "Error while adding habit, please try again" });
    }
})



//@ POST     /api/users/complete/:id
//@ DESC:-   marks completion of particular habit of user
//@ Access:- private
router.post('/complete/:id', async (req, res) => {
    const habitId = req.params.id;
    const userId = req.body.id;
    const user = await User.findById(userId)
    try {
        let habitIdNotFound = true
        for (const index in user.habits) {
            if (user.habits[index]._id == habitId) {
                if (user.habits[index].isCompleted === true) {
                    throw new Error('Habit already completed!')
                }
                user.habits[index].isCompleted = true;
                user.rewardPoints += 500;
                habitIdNotFound = false;
                await user.save();
            }
        }
        if (habitIdNotFound === true) {
            throw new Error('Habit not found')
        }
        user.completed += 1;
        user.completed = user.completed > user.habits.length ? user.habits.length : user.completed;
        await user.save();
        res.send({ user })
    } catch (e) {
        res.status(500).send({ e, message: "Error in changing the status of the habit" });
    }
})



//@ POST     /api/users/increment/:id
//@ DESC:-   increments streak of the habit of a user
//@ Access:- private
router.post('/increment/:id', async (req, res) => {
    const habitId = req.params.id;
    const userId = req.body.id;
    const user = await User.findById(userId)
    try {
        let habitIdNotFound = true
        for (const index in user.habits) {
            if (user.habits[index]._id == habitId) {
                user.habits[index].streak += 1;
                if (user.habits[index].streak === 21) {
                    user.habits[index].isCompleted = true;
                    user.rewardPoints += 500;
                }
                habitIdNotFound = false;
                await user.save();
            }
        }
        if (habitIdNotFound === true) {
            throw new Error('Habit not found')
        }
        res.send({ user })
    } catch (e) {
        res.status(500).send({ e, message: "Error in incrementing the streak" });
    }
})

//@ GET      /api/users/habits/:id
//@ DESC:-   will get the habits of user
//@ Access:- public
router.get('/habits/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        res.send(user.habits);
    } catch (e) {
        res.status(500).send(e)
    }

})



module.exports = router;