/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        username: { type: 'varchar(32)', notNull: true, unique: true },
        email: { type: 'varchar(100)', notNull: true, unique: true },
        hash: {type:'varchar(64)', notNull: true},
        createdAt: {type: 'timestamp', notNull: true, default: pgm.func('current_timestamp')},
        updatedAt: {type: 'timestamp', notNull: true, default: pgm.func('current_timestamp')},
        profileImage: {type: 'string', notNull: true, default: 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/052967c305a8f96a4b40b79ce5e61b0d.png'},
        bio: {type: 'varchar(400)', default: 'This user has not written a bio yet'}
        },
      )
};

exports.down = pgm => {};
