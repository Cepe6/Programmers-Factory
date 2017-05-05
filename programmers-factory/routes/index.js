var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function(req, res){
    res.render('index', {
        title: 'Home'
    });
});

router.get('/users', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/welcome', function (req, res) {
    res.render('welcome', {
        username: res.userName
    });
});

router.post('/sign-up', function(req, res) {
    Account.register(new Account({ username : req.params.username }), req.params.password, function(err, account) {
        if (err) {
            return res.render('welcome', { username : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/users');
        });
    });
});

router.get('/sign-in', function(req, res) {
    res.render('sign-in', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;
