/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`CREATE TABLE comments (
        id serial PRIMARY KEY,
        author_id INT NOT NULL,
        comment_text VARCHAR(200) NOT NULL,
        post_id INT NOT NULL,
        created_at TIMESTAMP,
        deleted BOOLEAN DEFAULT false,
        FOREIGN KEY (post_id) REFERENCES posts (id),
        FOREIGN KEY (author_id) REFERENCES users (id)
    );`)
};


