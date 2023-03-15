let express = require('express');
let app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

let {PORT = 5555} = process.env

app.get("/", (req, res) => {
    res.send({'hello': "harm"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})