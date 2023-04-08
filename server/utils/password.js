const bcrypt = require('bcryptjs');
require('dotenv').config();

async function hashifier(password) {
    return await bcrypt.hash(password, 15);
}

function validatePass(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashifier,
    validatePass,
};