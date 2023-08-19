const { pgPool } = require('../config/database');

module.exports = {
  create: async (categoryId, creatorId, promptText) => {
    try {
      if (categoryId && creatorId && promptText) {
        const result = await pgPool.query(
          'INSERT INTO prompts (category_id, creator_id, prompt_text) VALUES ($1, $2, $3) RETURNING *',
          [categoryId, creatorId, promptText]
        );
        return result.rows[0];
      }
      console.error('categoryId, creatorId, and promptText are all required.');
    } catch (err) {
      console.log(err);
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
      console.error('Id is a requied input.');
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
