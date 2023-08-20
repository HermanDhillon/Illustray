const Prompt = require('../models/Prompt');

module.exports = {
  create: async (req, res) => {
    const { title, promptText } = req.body;
    try {
      const promptData = await Prompt.create(1, req.user, title, promptText);
      // res.json({ prompt: 'created' });
    } catch (error) {
      res.json('error');
    }
  },

  getPrompt: async (req, res) => {
    try {
      // const promptData = await Prompt.findByUsername(req.params.username);
      // const { username, bio, profileimage } = userData;
      // res.json({ username, bio, profileimage });
      res.json({ prompt: 'here it is' });
    } catch (error) {
      res.json({ prompt: 'I couldnt find it' });
    }
  }
};
