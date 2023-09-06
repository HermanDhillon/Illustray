const User = require('../models/user');
const cloudinary = require('../middleware/cloudinary');

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const userData = await User.findByUsername(req.params.username);
      const { username, bio, profileimage } = userData;

      res.json({ username, bio, profileimage });
    } catch (err) {
      res.status(502).send('Error in getting User');
    }
  },
  updateProfilePic: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findByUsernameAndUpdateProfilePic(
        req.user.username,
        result.url
      );
      res.send('Profile Pic updated');
    } catch (err) {
      res.status(502);
    }
  }
};
