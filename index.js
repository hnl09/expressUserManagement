// Importing libraries

import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// Connecting DB with local variables
export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  }).promise();
  
// Query to users table
const result = await pool.query("SELECT * FROM users")
console.log(result[0])

// Importing users.js
import usersRoutes from './routes/users.js'

// Instantiating Express
const app = express();
const PORT = 5000;

// This says we're going to be using JSON in our whole app
app.use(bodyParser.json());

// When /users is called will return usersRoutes file
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from homepage'));

// Making app to listen on incoming requests
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
