const { query } = require('express');
const { pgPool } = require('../config/database');

module.exports = {
  create: async (categoryId, userId, imageUrl, width, height) => {
    if (userId && imageUrl && categoryId) {
      const result = await pgPool.query(
        'INSERT INTO posts (user_id, image_url, category_id, width, height) VALUES ($1, $2, $3, $4, $5)',
        [userId, imageUrl, categoryId, width, height]
      );
      return result.rows[0];
    }
    throw Error('Missing at least one required argument in Post.create model.');
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
