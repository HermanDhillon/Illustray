/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`CREATE TABLE posts (
        id serial PRIMARY KEY,
        user_id INT NOT NULL,
        image_url VARCHAR(64),
        created_at TIMESTAMP,
        deleted BOOLEAN DEFAULT false,
        categoryId INT NOT NULl,
        FOREIGN KEY (categoryId) REFERENCES categories (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
    );`)
};

