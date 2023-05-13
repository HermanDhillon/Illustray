const validator = require('validator');
const passport = require('passport');
const User = require('../models/User');
const { hashifier } = require('../utils/password');

module.exports = {
  postLogin: (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      return res.redirect('/login');
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: true,
    });

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('errors', info);
        return res.redirect('/login');
      }
      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        req.flash('success', { msg: 'Success! You are logged in.' });
        // res.redirect(req.session.returnTo || '/');
        res.json({ login: 'successful' });
      });
    })(req, res, next);
  },

  postSignUp: async (req, res, next) => {
    const validationErrors = [];
    const { username, password } = req.body;
    let { email } = req.body;

    if (!validator.isEmail(email)) {
      validationErrors.push({ msg: 'Please enter a valid email address.' });
    }
    if (!validator.isStrongPassword(password)) {
      validationErrors.push({ msg: 'Password must be atleast 8 characters long, Contain atleast 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol.' });
    }
    if (!validator.isAlphanumeric(username, 'en-US', { ignore: '_' })) {
      validationErrors.push({ msg: 'Username can only contain letters, numbers and underscores.' });
    }
    if (!validator.isLength(username, { min: 4, max: 30 })) {
      validationErrors.push({ msg: 'Username must be between 4 and 30 characters long.' });
    }
    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      return res.redirect('/signup');
    }

    email = validator.normalizeEmail(email, { gmail_remove_dots: true });
    const hash = await hashifier(password);
    // Check to see if username or email already exists.
    const userLookup = await User.findByEmailOrUsername(email, username);

    if (userLookup) {
      req.flash('errors', { msg: 'Username or email already in use.' });
      console.log('email already exists');
      return res.redirect('/signup');
    }

    const user = await User.create(username, email, hash);
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
};
