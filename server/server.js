const express = require('express');

const app = express();
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const { pgPool } = require('./config/database');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const promptRouter = require('./routes/prompt');

require('dotenv').config();
require('./config/passport');

const { PORT } = process.env;

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session store and session config
app.use(
  session({
    store: new PgSession({
      pool: pgPool,
      tableName: 'user_sessions',
      createTableIfMissing: true
      // Insert connect-pg-simple options here
    }),
    saveUninitialized: true,
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 01 days
    // Insert express-session options here
  })
);

// passport initialize and session integration
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/prompt', promptRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
