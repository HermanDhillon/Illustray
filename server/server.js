const express = require('express');
const app = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const {pgPool} = require('./config/database');
const authRouter = require('./routes/auth');
const passport = require('passport');
const flash = require('express-flash');

require('dotenv').config();
require('./config/passport');

let {PORT} = process.env;

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Session store and session config
app.use(session({
    store: new pgSession({
      pool : pgPool,
      tableName : 'user_sessions',
      createTableIfMissing: true,
      // Insert connect-pg-simple options here
    }),
    saveUninitialized: true,
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 01 days
    // Insert express-session options here
  }));

// passport initialize and session integration
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// routes
app.use('/api/auth', authRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});