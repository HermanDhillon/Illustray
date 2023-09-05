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

  findManyByCreatorId: async (creatorId) => {
    try {
      if (creatorId) {
        const result = await pgPool.query(
          'SELECT * from prompts WHERE creator_id=$1',
          [creatorId]
        );
        return result.rows[0]; // returns a single object
      }
      console.error('creatorId is a required input');
    } catch (err) {
      console.log(err);
    }
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

  findMany: async () => {
    try {
      const result = await pgPool.query(
        'SELECT * from prompts ORDER BY username ASC'
      );
      return result.rows; // returns a list of objects
    } catch (err) {
      console.log(err);
    }
  }
};
