var express = require('express');
var router = express.Router();
var model = require('../models/model');

var date = new Date();
var data = {
    title: 'My Chat App',
    lastUpdated: date.toDateString(),
    subtitle: 'Chat room application using websockets'
};

/** getUser checks the cookie to see if a user has already been initiated, and
 * if no, does so. Then returns the user details (user.name, user.id)
 */

function getUser(ck, res) {
    var userId;
    if (ck.userId) {
        // get user details
        console.log("User id alread set", ck.userId);
        userId = ck.userId;
    }
    else {
        // set userId for new user.
        var httpOnly = false;
        var userId = Math.floor(Math.random() * 1000000);
        console.log("Set a new user id", userId);
        res.cookie('userId', userId, {httpOnly: httpOnly});
    }
    return userId;
}

/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = getUser(req.cookies, res);
    data.user = model.getUser(userId);
    data.random = Math.floor(Math.random() * 100000); // room id
    data.chatting = false;
    res.render('index', data);
});

/* Update username */
router.get('/updatename/:name', function(req, res, next){
    console.log("Hello world");
    // console.log('GET...', req.cookies.userId, req.params);
    model.updateUserName(req.cookies.userId, req.params.name);
    res.send(req.params.name+' updated');
});

/* GET room. */
router.get('/:room', function(req, res, next) {
    var userId = getUser(req.cookies, res);
    data.user = model.getUser(userId);
    console.log(data.user);
    data.room = req.params.room;
    data.url = 'http://' + req.headers.host + '/' + req.params.room;
    data.chatting = true;
    res.render('index', data);
});





module.exports = router;
