const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validatePass } = require('../utils/password');
const User = require('../models/user');

// Verify callback function passed into local strategy for verifying password.
async function verify(username, password, cb) {
  try {
    const user = await User.findByUsername(username);
    if (!user || !validatePass(password, user.hash)) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }

    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}

const strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});
