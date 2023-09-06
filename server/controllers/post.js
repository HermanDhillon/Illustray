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
      const posts = await Post.findManyByUserId(req.user.id);
      res.json({ posts });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
      res.render('feed.ejs', { posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPromptPage: async (req, res) => {
    try {
      const response = await Post.findManyByPromptId(req.params.promptId);
      if (!response) {
        res.json({});
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(502).send('Error in getting posts');
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render('post.ejs', { post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 }
        }
      );
      console.log('Likes +1');
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      const post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log('Deleted Post');
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  }
};
