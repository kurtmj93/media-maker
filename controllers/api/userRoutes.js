const router = require('express').Router();
const { User } = require('../../models');
const getAuth = require('../../utils/auth');
const nodemailer = require('nodemailer');

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

    var transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: 'mediamaker804@hotmail.com',
        pass: 'TpI2H4U101!'
      }
    });
    
    var mailOptions = {
      from: 'mediamaker804@hotmail.com',
      to: req.body.email,
      subject: 'New Account',
      text: 'Welcome to Media Maker, ' + req.body.username,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

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

  router.delete('/:id', getAuth, async (req, res) => {
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

  