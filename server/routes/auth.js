var express = require('express');

var router = express.Router();

router.get('/login', (req, res, next) => {
  res.send({
    username: 'harm',
    password: '1234',
    });
});

module.exports = router;