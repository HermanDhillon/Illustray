const Prompt = require('../models/prompt');
const User = require('../models/user');

module.exports = {
  create: async (req, res) => {
    const { title, promptText } = req.body;
    try {
      const response = await Prompt.create(1, req.user.id, title, promptText);
      res.json(response);
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
      const response = await Prompt.findByPromptId(req.params.promptId);

      const { title } = response;
      const promptText = response.prompt_text;
      const creatorId = response.creator_id;
      const createdAt = response.created_at;
      // TODO: rewrite findByPromptId model so that it joins with users table to avoid this call.
      const userData = await User.findById(creatorId);
      const { username, profileimage } = userData;

      res.json({
        title,
        promptText,
        createdAt,
        username,
        profileimage
      });
    } catch (err) {
      let text = 'Error in finding Prompt';
      if (err.cause === 'Prompt does not exist') {
        text = err.cause;
      }
      res.status(404).send(text);
    }
  },

  getUserPrompts: async (req, res) => {
    try {
      const response = await Prompt.findByUsername(req.params.username);
      if (!response) {
        res.json({});
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(502).send('Error in getting users prompts');
    }
  },

  getHomePrompts: async (req, res) => {
    try {
      const response = await Prompt.findNewestFive();
      if (!response) {
        res.json([]);
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(502).send('Could not get hompage prompts');
    }
  }
};
