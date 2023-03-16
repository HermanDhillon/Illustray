let express = require('express');
let app = express();
let {pool} = require('./config/database');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

let {PORT} = process.env;

app.get("/", (req, res) => {
    res.send({'hello': "harm"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})