// Mocking database
let users = []

//  Importing DB
import { pool } from '../index.js';

//  Importing UUID
import { v4 as uuidv4 } from 'uuid';

const errorMsg = 'Error, try again in a few minutes or contact a developer for further details.'

// Method to retrieve all users
export const getUsers = (req, res) => {
    pool.query("SELECT * FROM users")
    .then(result => {
        res.send(result[0]);
    }).catch(error => {
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

    const userUID = uuidv4()

    pool.query(`
    INSERT INTO users (id, firstName, lastName, age)
    VALUES ('${userUID}', ?, ?, ?)
    `, [user.firstName, user.lastName, user.age])
    .then(result => {
        pool.query(`SELECT * FROM users WHERE id = ?`, [userUID]).then(user => {
            res.status(201).send(user[0]);  
        }).catch(error => {
            res.send(errorMsg);
            console.error(error);
        })
    })
    .catch(error => {
        res.send(errorMsg);
        console.error(error);
    });
}


// Method to delete user
export const deleteUser = (req, res) => {
    const { id } = req.params

    pool.query(`SELECT * FROM users WHERE id = ?`, [id]).then(user => {
        if(user[0].length !== 0) {
            let firstName = user[0][0].firstName
            pool.query("DELETE FROM users WHERE id = ?", [id])
            .then(result => {
                res.send(`User ${firstName} deleted`);
            }).catch(error => {
                res.send(errorMsg);
                console.error(error);
            });
        } else {
            res.send('User not found')
        }
    }).catch(error => {
        res.send(errorMsg);
        console.error(error);
    });
}

// Method to update user data
export const updateUser = (req, res) => {
    const { id } = req.params

    const { firstName, lastName, age } = req.body

    pool.query(`SELECT * FROM users WHERE id = ?`, [id]).then(user => {
        if(user[0].length !== 0) {

            if(firstName) {
                pool.query("UPDATE users SET firstName = ? WHERE id = ?", [firstName, id])
            }
        
            if(lastName) {
                pool.query("UPDATE users SET lastName = ? WHERE id = ?", [lastName, id])
            }
        
            if(age) {
                pool.query("UPDATE users SET age = ? WHERE id = ?", [age, id])
            }

            pool.query(`SELECT * FROM users WHERE id = ?`, [id]).then(user => {
                res.status(200).send(user[0]);  
            }).catch(error => {
                res.send(errorMsg);
                console.error(error);
            })

        } else {
            res.send('User not found')
        }
    }).catch(error => {
        res.send(errorMsg);
        console.error(error);
    });
}