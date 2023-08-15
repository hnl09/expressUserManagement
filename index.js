// Importing libraries

import express from 'express';
import bodyParser from 'body-parser';


// Instantiating Express
const app = express();
const PORT = 5000;

// This says we're going to be using JSON in our whole app
app.use(bodyParser.json())

// Making app to listen on incoming requests
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
