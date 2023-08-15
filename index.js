// Importing libraries

import express from 'express';
import bodyParser from 'body-parser';

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
