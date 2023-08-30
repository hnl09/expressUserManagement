import express from 'express';

// Importing methods
import { createUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/users.js'; // Always remember the js extension


//  Initializing our Router
const router = express.Router()

// All routes in here are starting with /users

// Method to retrieve all users
router.get('/', getUsers)

// Method to create user
router.post('/', createUser)

// Method to retrieve specific user
router.get('/:id', getUser)

// Method to delete user
router.delete('/:id', deleteUser)

// Method to update user data
router.patch('/:id', updateUser)

export default router;