const User = require('../models/user');

module.exports = {
  getUserProfile: async (req, res) => {
    const userData = await User.findByUsername(req.params.username);
    if (!userData) {
      res.json({ Error: 'User not found.' });
    } else {
      const { username, bio, profileimage } = userData;
      res.json({ username, bio, profileimage });
    }
  }
};
