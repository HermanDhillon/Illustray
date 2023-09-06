/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`ALTER TABLE posts
  ADD COLUMN prompt_id INT NOT NULL 
  REFERENCES prompts (id)`);
};
