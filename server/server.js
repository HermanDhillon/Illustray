let express = require('express');
let app = express();
require('dotenv').config();

let {PORT = 5000} = process.env;

app.get("/", (req, res) => {
    res.send({'hello': "harm"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})