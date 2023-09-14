const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/post');

module.exports = {
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create(
        1,
        req.user.id,
        result.url,
        result.width,
        result.height,
        req.params.promptId
      );
      res.send('Post created');
    } catch (err) {
      console.log(err);
      res.status(502).send('Error in creating post');
    }
  },
  getProfile: async (req, res) => {
    try {
      const response = await Post.findManyByUserId(req.user.id);
      if (!response) {
        res.json({});
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(502).send('Error in getting posts');
    }
  },
  getHomePosts: async (req, res) => {
    try {
      const response = await Post.findNewestTen();
      if (!response) {
        res.json({});
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(502).send('Could not get hompage posts');
    }
  },
  getPromptPosts: async (req, res) => {
    try {
      const response = await Post.findByPromptId(req.params.promptId);
      if (!response) {
        res.json({});
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(502).send('Error in getting posts');
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const response = await Post.findByUsername(req.params.username);
      if (!response) {
        res.json({});
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(502).send('Error in getting posts');
    }
  },
  getPost: async () => {},
  likePost: async () => {},
  deletePost: async () => {}
};
