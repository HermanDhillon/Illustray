const User = require('../models/User');

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const userData = await User.findByUsername(req.params.username);
      const { username, bio, profileimage } = userData;
      res.json({ username, bio, profileimage });
    } catch (error) {
      res.json(false);
    }
  }
};
