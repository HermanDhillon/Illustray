const { pgPool } = require('../config/database');

module.exports = {
  create: async (categoryId, creatorId, title, promptText) => {
    try {
      if (categoryId && creatorId && title && promptText) {
        const result = await pgPool.query(
          'INSERT INTO prompts (category_id, creator_id, title, prompt_text) VALUES ($1, $2, $3, $4) RETURNING *',
          [categoryId, creatorId, title, promptText]
        );
        return result.rows[0];
      }
      console.error(
        'categoryId, creatorId, title, and promptText are all required.'
      );
    } catch (err) {
      return {
        Error: err.detail
      };
    }
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

  findById: async (Id) => {
    try {
      if (Id) {
        const result = await pgPool.query('SELECT * from prompts WHERE id=$1', [
          Id
        ]);
        return result.rows[0]; // returns a single object
      }
      console.error('Id is a required input.');
    } catch (err) {
      console.log(err);
    }
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
