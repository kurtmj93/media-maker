const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/feed');
      return;
    }
    res.render('login');
  });

module.exports = router;

// get all posts for main feed
router.get('/feed', async (req, res) => {

    if (!req.session.loggedIn) { // check if loggedin
        res.redirect('/');
        return;
      }

    try {
        const postData = await Post.findAll({
            limit: 20, 
            order: [[ 'date_created', 'DESC' ]],
            include: { model: User, attributes: ['username'] }
        });

        const posts = postData.map((post => post.get ({ plain: true })));
        console.log(req.session.user);
        res.render('feed', 
        { posts, 
          loggedIn: req.session.loggedIn, // passes this info to handlebars render so it can be used as a conditional
          user_id: req.session.userid
        }); 
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {

    if (req.session.loggedIn) { // check if loggedin
        res.redirect('/feed');
        return;
      }
    res.render('signup');
});