const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {pgPool} = require('./database');
const {validatePass}= require('../utils/password');

// Verify callback function passed into local strategy for verifying password.
function verify(username, password, cb) {
    pgPool.query('SELECT * FROM users WHERE username = $1', [ username ], (err, res) => {
        if (err) {
            return cb(err); 
        }
        let user = res.rows[0];
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.'}); 
        }   

        if (!validatePass(password, user.hash)) {
            return cb(null, false, {message: 'Incorrect username or password.'})
        }

        return cb(null, res)
    })
}

let strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    pgPool.query('SELECT * FROM users WHERE id = $1', [id], (err, user) => {
        cb(null, user);
    });
});