const Prompt = require('../models/Prompt');
const User = require('../models/User');

module.exports = {
  create: async (req, res) => {
    const { title, promptText } = req.body;
    const promptData = await Prompt.create(1, req.user.id, title, promptText);
    res.json(promptData);
  },

  getPrompt: async (req, res) => {
    console.log(req.params.promptId);
    const promptData = await Prompt.findById(req.params.promptId);
    if (!promptData) {
      res.json({ Error: 'Prompt not found.' });
    } else {
      const { title } = promptData;
      const promptText = promptData.prompt_text;
      const creatorId = promptData.creator_id;
      const createdAt = promptData.created_at;
      const userData = await User.findById(creatorId);
      const { username, bio, profileimage } = userData;

      res.json({
        title,
        promptText,
        createdAt,
        username,
        bio,
        profileimage
      });
    }
  }
};
