import express from 'express';

//  Importing UUID
import { v4 as uuidv4 } from 'uuid';

//  Initializing our Router
const router = express.Router();

// Mocking database
const users = []

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

export default router;