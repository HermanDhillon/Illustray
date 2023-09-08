const { pgPool } = require('../config/database');

module.exports = {
  create: async (categoryId, creatorId, title, promptText) => {
    if (categoryId && creatorId && title && promptText) {
      const result = await pgPool.query(
        'INSERT INTO prompts (category_id, creator_id, title, prompt_text) VALUES ($1, $2, $3, $4) RETURNING *',
        [categoryId, creatorId, title, promptText]
      );
      return result.rows[0];
    }
    throw new Error(
      'Missing at least one required argument in Prompt.create model '
    );
  },

  findByUsername: async (username) => {
    if (username) {
      const result = await pgPool.query(
        'SELECT prompts.id, prompts.title, prompts.prompt_text, prompts.created_at from prompts INNER JOIN users ON prompts.creator_id = users.id WHERE users.username = $1 ORDER BY prompts.created_at DESC',
        [username]
      );
      return result.rows; // returns a list of objects.
    }
    throw new Error('username is a required input');
  },

  findByPromptId: async (Id) => {
    if (Id) {
      const result = await pgPool.query('SELECT * from prompts WHERE id=$1', [
        Id
      ]);
      if (!result.rows[0]) {
        throw new Error('Prompt table returned no rows', {
          cause: 'Prompt does not exist'
        });
      }
      return result.rows[0]; // returns a single object
    }
    throw new Error(
      'Missing at least one required argument in Prompt.findById model '
    );
  },

  findNewestFive: async (count = 5) => {
    const result = await pgPool.query(
      'SELECT users.username, users.profileImage, prompts.id, prompts.title, prompts.prompt_text, prompts.created_at from prompts INNER JOIN users ON prompts.creator_id = users.id ORDER BY prompts.created_at DESC LIMIT $1',
      [count]
    );
    return result.rows;
  },

  findMany: async () => {
    const result = await pgPool.query(
      'SELECT * from prompts ORDER BY username ASC'
    );
    return result.rows; // returns a list of objects
  }
};
