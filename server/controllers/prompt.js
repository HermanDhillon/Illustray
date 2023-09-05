const Prompt = require('../models/Prompt');
const User = require('../models/User');

module.exports = {
  create: async (req, res) => {
    const { title, promptText } = req.body;
    try {
      const promptData = await Prompt.create(1, req.user.id, title, promptText);
      res.json(promptData);
    } catch (err) {
      let text = 'Error in creating Prompt';
      if (err.detail === `Key (prompt_text)=(${promptText}) already exists.`) {
        text = 'This prompt already exists';
      }
      res.status(409).send(text);
    }
  },

  getPrompt: async (req, res) => {
    try {
      const promptData = await Prompt.findByPromptId(req.params.promptId);

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
    } catch (err) {
      let text = 'Error in finding Prompt';
      if (err.cause === 'Prompt does not exist') {
        text = err.cause;
      }
      res.status(404).send(text);
    }
  }
};
