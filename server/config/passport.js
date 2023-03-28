const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {validatePass}= require('../utils/password');
const {User} = require('../models/user');

// Verify callback function passed into local strategy for verifying password.
async function verify(username, password, cb) {
    try{
        const userModel = new User(username);
        const user = await userModel.findUserByUsername();

        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.'});
        }
        if (!validatePass(password, user.hash)) {
            return cb(null, false, {message: 'Incorrect username or password.'});
        }

        return cb(null, user);
    } catch(err){
        return cb(err);
    }
};

let strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser( async (Id, cb) => {
    const userModel = new User();
    const user = await userModel.findUserById(Id);
    cb(null, user);
});