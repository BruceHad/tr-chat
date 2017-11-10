var express = require('express');
var router = express.Router();
var model = require('../models/model');

var date = new Date();
var data = { 
    title: 'Websocket Chat', 
    lastUpdated: date.toDateString(),
    subtitle: 'A simple chat application'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', data);
});



module.exports = router;

