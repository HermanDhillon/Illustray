const express = require('express');
const app = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const {pool} = require('./config/database');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
    dotenv.config('./.env.prod');
  }else{
    dotenv.config('./.env');
  }

let {PORT} = process.env;

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Session store and session config
app.use(session({
    store: new pgSession({
      pool : pool,                
      tableName : 'user_sessions',
      createTableIfMissing: true,
      // Insert connect-pg-simple options here
    }),
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    // Insert express-session options here
  }));

app.get("/api", (req, res) => {
    res.send({'hello': "harm"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})