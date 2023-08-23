// Mocking database
let users = []

//  Importing DB
import { pool } from '../index.js';

//  Importing UUID
import { v4 as uuidv4 } from 'uuid';

const errorMsg = 'Error, contact a developer for further details.'

// Method to retrieve all users
export const getUsers = (req, res) => {
    pool.query("SELECT * FROM users")
    .then(result => {
        res.send(result[0]);
    })
    .catch(error => {
        res.send(errorMsg);
        console.error(error);
    });
}

// Method to retrieve specific user
export const getUser = (req, res) => {
    const { id } = req.params // It gets the get params

    pool.query("SELECT * FROM users WHERE id = ?", [id])
    .then(result => {
        res.send(result[0]);
    })
    .catch(error => {
        res.send(errorMsg);
        console.error(error);
    });
}

// Method to create user
export const createUser = (req, res) => {
    const user = req.body // I'ts the body json content

    pool.query(`
    INSERT INTO users (id, firstName, lastName, age)
    VALUES ('${uuidv4()}', ?, ?, ?)
    `, [user.firstName, user.lastName, user.age])
    .then(result => {
        res.send(`User ${user.firstName} successfully added to the database!`);
    })
    .catch(error => {
        res.send(errorMsg);
        console.error(error);
    });
}


// Method to delete user
export const deleteUser = (req, res) => {
    const { id } = req.params

    let userData = users.find((user) => (user.id === id))

    if (!userData) {
        res.send(`User with id ${id} not found`)
        return
    }

    users = users.filter((user) => (user.id !== id))

    res.send(`User ${userData.firstName} with id ${id} successfully deleted!`)
}

// Method to update user data
export const updateUser = (req, res) => {
    const { id } = req.params

    const { firstName, lastName, age } = req.body

    const user = users.find((user) => user.id === id)

    if(firstName) {
        user.firstName = firstName
    }

    if(lastName) {
        user.lastName = lastName
    }

    if(age) {
        user.age = age
    }
    
    res.send(`User with id ${id} successfully updated!`)
}