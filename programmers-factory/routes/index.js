var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index', {
        title: 'Home'
    });
});

router.get('/about', function(req, res){
    res.render('about', {
        title: 'About'
    });
});

router.get('/contact', function(req, res){
    res.render('contact', {
        title: 'Contact'
    });
});

router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register'
    });
});

router.post('/adduser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPass = req.body.userpass;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "password" : userPass
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("users");
        }
    });
});

module.exports = router;
