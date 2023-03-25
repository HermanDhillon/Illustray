const bcrypt = require('bcryptjs');
require('dotenv').config();

function hashifier(password) {
    return bcrypt.hash(password, 15, (err, hash) => hash);
}

function validatePass(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashifier,
    validatePass,
};