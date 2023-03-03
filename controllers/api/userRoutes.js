const router = require('express').Router();
const { User } = require('../../models');
const getAuth = require('../../utils/auth');
const nodemailer = require('nodemailer');

// require and set API key for sendgrid - to be used for heroku to send emails
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// get all users
router.get('/', async (req, res) => {
  try {
      const users = await User.findAll();
      res.status(200).json(users);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });

    const msg = {
        to: req.body.email, // Change to your recipient
        from: 'mediamaker1337@gmail.com', // Change to your verified sender
        subject: 'Thank you for creating an account!',
        text: 'Welcome to Media Maker, ' + req.body.username,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'There is no user with that username. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'This username and password combination is incorrect. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
  
      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;

  