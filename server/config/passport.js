const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const {pgPool} = require('./database');



function verify(username, password, cb) {

}

let strategy = new LocalStrategy()
passport.use()