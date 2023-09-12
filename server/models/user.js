const { pgPool } = require('../config/database');

module.exports = {
  create: async (username, email, hash) => {
    try {
      if (username && email && hash) {
        const result = await pgPool.query(
          'INSERT INTO users (username, email, hash) VALUES ($1, $2, $3) RETURNING *',
          [username, email, hash]
        );
        return result.rows[0];
      }
      console.error('Username, Email, and Hash are all required.');
    } catch (err) {
      console.log(err);
    }
  },
  findByUsernameAndUpdateProfilePic: async (username, imageUrl) => {
    if (username && imageUrl) {
      const result = await pgPool.query(
        'UPDATE users SET profileImage = $1 WHERE username = $2',
        [imageUrl, username]
      );
      return result.rows[0]; // returns a single object
    }
    throw Error('missing a required argument');
  },

  findByUsernameAndUpdateBio: async (username, bio) => {
    if (username && bio) {
      const result = await pgPool.query(
        'UPDATE users SET bio = $1 WHERE username = $2',
        [bio, username]
      );
      return result.rows[0]; // returns a single object
    }
    throw Error('missing a required argument');
  },

  findByUsername: async (username) => {
    if (username) {
      const result = await pgPool.query(
        'SELECT * from users WHERE username=$1',
        [username]
      );
      if (!result.rows[0]) {
        throw new Error('User not found');
      }
      return result.rows[0]; // returns a single object
    }
    throw new Error('Username is a required input');
  },

  findByEmail: async (email) => {
    try {
      if (email) {
        const result = await pgPool.query(
          'SELECT * from users WHERE email=$1',
          [email]
        );
        return result.rows[0]; // returns a single object
      }
      console.error('Email is a required input.');
    } catch (err) {
      console.log(err);
    }
  },

  findByEmailOrUsername: async (email, username) => {
    try {
      if (email) {
        const result = await pgPool.query(
          'SELECT * from users WHERE email=$1 OR username=$2',
          [email, username]
        );
        return result.rows[0]; // returns a single object
      }
      console.error('Email is a required input.');
    } catch (err) {
      console.log(err);
    }
  },

  findById: async (Id) => {
    try {
      if (Id) {
        const result = await pgPool.query('SELECT * from users WHERE id=$1', [
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
        'SELECT * from users ORDER BY username ASC'
      );
      return result.rows; // returns a list of objects
    } catch (err) {
      console.log(err);
    }
  }
};
