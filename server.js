// require express & call as function
const express = require('express');
const app = express();

const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');

// process.env.PORT allows heroku to set the port
let port = process.env.PORT;
// if heroku doesn't set the port (local), port = 3001
if (port == null || port == "") {
  port = 3001;
}

// express middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use static resources in public folder
app.use(express.static('public'));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});