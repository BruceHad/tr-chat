var express = require('express');
var router = express.Router();
var model = require('../models/model');

var date = new Date();
var data = { 
    title: 'My Chat App', 
    lastUpdated: date.toDateString(),
    subtitle: 'Chat room application using websockets'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    data.random = Math.floor(Math.random()*100000);
    data.chatting = false;
    res.render('index', data);
});

router.get('/:room', function(req, res, next){
    if(req.params.room){
        data.chatting = true;
        data.room = req.params.room;
        data.url = 'http://' + req.headers.host + '/' + req.params.room;
    }
    res.render('index', data);
});



module.exports = router;