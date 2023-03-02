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
            include: { model: User, attributes: ['username'] }
        });

        const posts = postData.map((post => post.get ({ plain: true })));
        console.log(posts);
        res.render('feed', { posts });
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