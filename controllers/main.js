const router = require('express').Router();
const { Post, User } = require('../models');

// get all posts for main feed
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: { model: User, attributes: ['username'] }
        });

        const posts = postData.map((post => post.get ({ plain: true })));
        res.render('feed', { posts })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;