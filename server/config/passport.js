const passport = require('passport');
const LocalStrategy = require('passport-local');
const {pgPool} = require('./database');
const {validatePass}= require('../utils/password');

// Verify callback function passed into local strategy for verifying password.
function verify(username, password, cb) {
    pgPool.query('SELECT * FROM users WHERE username = $1', [ username ], (err, user) => {
        if (err) {
            return cb(err); 
        }
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.'}); 
        }   

        if (!validatePass(password, user.hash, user.salt)) {
            return cb(null, false, {message: 'Incorrect username or password.'})
        }

        return cb(null, user)
    })
}

let strategy = new LocalStrategy(verify(username, passport, cb));

passport.use(strategy);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    pgPool.query('SELECT * FROM users WHERE id = $1', [id], (err, user) => {
        cb(null, user);
    })
});