/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`CREATE TABLE categories(
        id serial PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULl
    );`)

    pgm.sql(`INSERT INTO categories (name) VALUES ('Prompts');`)
};
