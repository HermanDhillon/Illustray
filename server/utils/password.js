const bcrypt = require('bcryptjs');
require('dotenv').config();

async function hashifier(password) {
  const hash = await bcrypt.hash(password, 5);
  return hash;
}

function validatePass(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  hashifier,
  validatePass
};
