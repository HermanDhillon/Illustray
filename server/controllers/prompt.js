const Prompt = require('../models/Prompt');

module.exports = {
  create: async (req, res) => {
    res.json({ prompt: 'created' });
  },
  getPrompt: async (req, res) => {
    try {
      // const userData = await Prompt.findByUsername(req.params.username);
      // const { username, bio, profileimage } = userData;
      // res.json({ username, bio, profileimage });
      res.json({ prompt: 'here it is' });
    } catch (error) {
      res.json({ prompt: 'I couldnt find it' });
    }
  }
};
