// require express & call as function
const express = require('express');
const app = express();
const path = require('path');

// process.env.PORT allows heroku to set the port
let port = process.env.PORT;
// if heroku doesn't set the port (local), port = 3001
if (port == null || port == "") {
  port = 3001;
}

// use static resources in public folder
app.use(express.static('public'));

// Express middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize app
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port} 🚀`)
);