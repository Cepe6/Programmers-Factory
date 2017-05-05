var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function(req, res){
    res.render('index', {
        title: 'Home'
    });
});


router.get('/welcome', function (req, res) {
    res.render('welcome', {
        username: res.userName
    });
});

module.exports = router;
