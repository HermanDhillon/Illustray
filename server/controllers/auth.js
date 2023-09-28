const validator = require('validator');
const passport = require('passport');
const User = require('../models/user');
const { hashifier } = require('../utils/password');

module.exports = {
  logout: (req, res) => {
    req.logout(() => {
      console.log('User has logged out.');
    });
    req.session.regenerate((err) => {
      if (err) {
        console.log(
          'Error : Failed to destroy the session during logout.',
          err
        );
      }
      req.user = null;
      res.clearCookie('username');
      res.json({ logout: 'successful' });
    });
  },

  postLogin: (req, res, next) => {
    // if (!validator.isEmail(req.body.email)) {
    //   validationErrors.push({ msg: 'Please enter a valid email address.' });
    // }
    if (
      validator.isEmpty(req.body.password) ||
      validator.isEmpty(req.body.username)
    ) {
      return res.json({ error: 'Fields cannot be blank.' });
    }

    // req.body.email = validator.normalizeEmail(req.body.email, {
    //   gmail_remove_dots: true,
    // });

    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ error: 'Incorrect username or password.' });
      }
      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        // res.redirect(req.session.returnTo || '/');
        res.cookie('username', user.username, { maxAge: 24 * 60 * 60 * 1000 }); // Expires in 01 days
        res.json({ login: 'successful' });
      });
    })(req, res, next);
  },

  postSignUp: async (req, res, next) => {
    const validationErrors = [];
    const { username, password, conPassword } = req.body;
    let { email } = req.body;

    if (!validator.isEmail(email)) {
      validationErrors.push('Please enter a valid email address.');
    }
    if (!validator.isStrongPassword(password)) {
      validationErrors.push(
        'Password must be atleast 8 characters long, Contain atleast 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol.'
      );
    }
    if (password !== conPassword) {
      validationErrors.push('Passwords do not match');
    }
    if (!validator.isAlphanumeric(username, 'en-US', { ignore: '_' })) {
      validationErrors.push(
        'Username can only contain letters, numbers and underscores.'
      );
    }
    if (!validator.isLength(username, { min: 4, max: 30 })) {
      validationErrors.push(
        'Username must be between 4 and 30 characters long.'
      );
    }
    email = validator.normalizeEmail(email, { gmail_remove_dots: true });
    const hash = await hashifier(password);
    // Check to see if username or email already exists.
    const userLookup = await User.findByEmailOrUsername(email, username.toLowerCase());

    if (userLookup) {
      validationErrors.push('Username or email already in use.');
    }

    if (validationErrors.length) {
      return res.status(403).json(validationErrors);
    }

    const user = await User.create(username.toLowerCase(), email, hash);
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.cookie('username', user.username, { maxAge: 24 * 60 * 60 * 1000 }); // Expires in 01 days
      res.send('Signup successful!');
    });
  }
};
