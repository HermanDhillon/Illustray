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
      const response = await Post.findFeed();
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
  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      const { username } = post;
      if ((req.user.username === 'illustray') || (req.user.username === username)) {
        const response = await Post.findByIdAndDelete(req.params.postId);
        const imageUrl = new URL(response.image_url);
        const publicId = imageUrl.pathname.split('/').at(-1).split('.')[0];
        await cloudinary.uploader.destroy(publicId).then((resp) => res.send(resp));
      } else {
        res.status(403).send('Unauthorized Delete Request');
      }
    } catch (err) {
      console.log(err);
      res.status(502).send('Error in deleting post');
    }
  }
};
