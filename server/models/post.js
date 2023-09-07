const { query } = require('express');
const { pgPool } = require('../config/database');

module.exports = {
  create: async (categoryId, userId, imageUrl, width, height, promptId) => {
    if (userId && imageUrl && categoryId) {
      const result = await pgPool.query(
        'INSERT INTO posts (user_id, image_url, category_id, width, height, prompt_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [userId, imageUrl, categoryId, width, height, promptId]
      );
      return result.rows[0];
    }
    throw Error('Missing at least one required argument in Post.create model.');
  },

  findByUsername: async (username) => {
    if (username) {
      const result = await pgPool.query(
        'SELECT posts.prompt_id, posts.image_url, posts.id, posts.width, posts.height from posts INNER JOIN users ON posts.user_id = users.id WHERE users.username = $1 ORDER BY posts.created_at DESC',
        [username]
      );
      return result.rows; // returns a list of objects
    }
    throw new Error('username is a required input');
  },

  findByPromptId: async (promptId) => {
    if (promptId) {
      const result = await pgPool.query(
        'SELECT * from posts WHERE prompt_id=$1',
        [promptId]
      );
      return result.rows; // returns list of object
    }
    throw new Error('promptId is a required input.');
  },

  findNewestFive: async (count = 5) => {
    const result = await pgPool.query(
      'SELECT * FROM posts ORDER BY created_at DESC LIMIT $1',
      [count]
    );
    return result.rows;
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
