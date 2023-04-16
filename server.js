// Imported express.js
const express = require('express');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// Imported my routers for my apiRoutes and htmlRoutes
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');
// Specifying which port the Expree.js server will run
const PORT = process.env.PORT || 3000;
// Initialize an instance of Express.js
const app = express();

// Set up the Express app to handle data parsing
// This is also wher the Middleware for parsing JSON and urlencoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Static middleware pointing to the public folder.
app.use(express.static('public'));

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)

);