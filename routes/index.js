var express = require('express');
var router = express.Router();
var model = require('../models/model');

var date = new Date();
var data = { 
    title: 'Quickstart- Express', 
    lastUpdated: date.toDateString(),
    subtitle: 'Base source for a Node/Express website'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('index', data);
});



module.exports = router;

