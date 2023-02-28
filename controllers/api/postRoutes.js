const router = require('express').Router();
const { Post } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one post
router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      
      if (!post) { // return specific error if there is no product found with this id
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// create a new post
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        text: req.body.text,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// delete a post
  
router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;