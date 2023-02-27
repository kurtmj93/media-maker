// require express & call as function
const express = require('express');
const app = express();

// call for express session package to handle user sessions
const session = require('express-session');

// connect controllers folder
const routes = require('./controllers');

// connect to db
const sequelize = require('./config/connection');
// connect express session to db
const SequelizeStore = require('connect-session-sequelize');

// process.env.PORT allows heroku to set the port
let port = process.env.PORT;
// if heroku doesn't set the port (local), port = 3001
if (port == null || port == "") {
  port = 3001;
}


// set and use session connection info
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// express middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use static resources in public folder and api routes
app.use(express.static('public'));
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});