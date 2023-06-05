/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE users (
        id serial PRIMARY KEY,
        username VARCHAR(32) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        hash VARCHAR(64) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        lastLogin TIMESTAMP,
        profileImage VARCHAR(1000) DEFAULT 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/052967c305a8f96a4b40b79ce5e61b0d.png',
        bio VARCHAR(400) DEFAULT 'This user has no bio yet'
      );
      `);
};
