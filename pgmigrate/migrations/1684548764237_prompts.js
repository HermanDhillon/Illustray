/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`CREATE TABLE prompts (
        id serial PRIMARY KEY,
        category_id INT NOT NULL,
        creator_id INT NOT NULL,
        prompt_text VARCHAR(250) UNIQUE NOT NULL,
        createdAT TIMESTAMP NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id),
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
      `)
};

