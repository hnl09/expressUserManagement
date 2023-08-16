import express from 'express';

//  Importing UUID
import { v4 as uuidv4 } from 'uuid';

//  Initializing our Router
const router = express.Router();

// Mocking database
let users = []

// All routes in here are starting with /users

// Creating get method
router.get('/', (req, res) => {
    res.send(users)
});

//  Creating Post Method
router.post('/', (req, res) => {
    const user = req.body // I'ts the body json content

    //  Pushing user to array db mock
    users.push({ ...user, id: uuidv4() })

    res.send(`User ${user.firstName} successfully added to the database!`)
});

//  Get method to retrieve user with specific id
router.get('/:id', (req, res) => {
    const { id } = req.params // It gets the get params

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser)
})

// Delete method to remove user with specific id
router.delete('/:id', (req, res) => {
    const { id } = req.params

    let userData = users.find((user) => (user.id === id))

    if (!userData) {
        res.send(`User with id ${id} not found`)
        return
    }

    users = users.filter((user) => (user.id !== id))

    res.send(`User ${userData.firstName} with id ${id} successfully deleted!`)
})

export default router;