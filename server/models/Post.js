const { pgPool } = require('../config/database');

module.exports = {
  create: async (userId, imageUrl, categoryId) => {
    try {
      if (userId && imageUrl && categoryId) {
        const result = await pgPool.query(
          'INSERT INTO posts (user_id, image_url, categoryId) VALUES ($1, $2, $3) RETURNING *',
          [userId, imageUrl, categoryId]
        );
        return result.rows[0];
      }
      console.error('userID, imageUrl, and categoryId are all required.');
    } catch (err) {
      console.log(err);
      return {
        Error: err.detail
      };
    }
  },

  findManyByUserId: async (userId) => {
    try {
      if (userId) {
        const result = await pgPool.query(
          'SELECT * from posts WHERE user_id=$1',
          [userId]
        );
        return result.rows; // returns a list of objects
      }
      console.error('userId is a required input');
    } catch (err) {
      console.log(err);
    }
  },

  findOneByPostId: async (postId) => {
    try {
      if (postId) {
        const result = await pgPool.query('SELECT 1 from posts WHERE id=$1', [
          postId
        ]);
        return result.rows[0]; // returns a single object
      }
      console.error('postId is a required input.');
    } catch (err) {
      console.log(err);
    }
  },

  findAll: async () => {
    try {
      const result = await pgPool.query(
        'SELECT * from posts ORDER BY username ASC'
      );
      return result.rows; // returns a list of objects
    } catch (err) {
      console.log(err);
    }
  }
};
