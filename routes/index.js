var express = require('express');
var router = express.Router();
var model = require('../models/model');

var date = new Date();

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = { title: 'To Do', lastUpdated: date.toDateString() };
    res.render('index', data);
});



module.exports = router;

