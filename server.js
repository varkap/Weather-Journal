// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bp = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
port = 8080;
const serv = app.listen(port, listen);
function listen() {
	console.log(`running on port ${port}`);
}

// POST
app.post('/addInfo', addInfo);
function addInfo(requirement, response) {
	projectData['date'] = requirement.body.date;
	projectData['temp'] = requirement.body.temp;
	projectData['content'] = requirement.body.content;
	response.send(projectData);
}

// GET
app.get('/all', getInformation);
function getInformation(requirement, response) {
	response.send(projectData);
	console.log(projectData);
}