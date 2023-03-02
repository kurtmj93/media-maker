// require express & call as function
const express = require('express');
const app = express();

// call for express session package to handle user sessions and handlebars for app engine
const session = require('express-session');
const handlebars = require('express-handlebars');

// connect controllers folder and helpers in utils
const routes = require('./controllers');
const helpers = require('./utils/helpers')

// connect to db
const sequelize = require('./config/connection');
// connect express session to db
const SequelizeStore = require('connect-session-sequelize')(
  session.Store
);

// process.env.PORT allows heroku to set the port
let port = process.env.PORT;
// if heroku doesn't set the port (local), port = 3001
if (port == null || port == "") {
  port = 3001;
}

// set and use session connection info
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// set handlebars as view engine
const bars = handlebars.create({ helpers });
app.engine('handlebars', bars.engine);
app.set('view engine', 'handlebars');

// express middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use static resources in public folder and api routes
app.use(express.static('public'));
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log('Now listening'));
});