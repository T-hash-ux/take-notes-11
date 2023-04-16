// Imported express.js
const express = require('express');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// Imported my routers for my apiRoutes and htmlRoutes
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.use(express.static('public'));

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)

);