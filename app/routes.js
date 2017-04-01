var express = require('express');
var router = express.Router();

var BusinessPage = require('./models/BusinessPage');


router.get('/', function(req, res) {
    res.render('home');
});

module.exports = router;
