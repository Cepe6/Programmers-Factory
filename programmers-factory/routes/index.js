var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index', {
        title: 'Home'
    });
    req.isAuthenticated();
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

router.get('/users', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.post("/sign-up", function (req, res) {
    // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //     return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    // }
    //
    // var secretKey = "6Lf-_x8UAAAAAM7pMaXKi_SGHUZw3DVGBknTZaIX";
    // var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // request(verificationUrl,function(error,response,body) {
    //     body = JSON.parse(body);
    //     if(body.success !== undefined && !body.success) {
    //         return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    //     }
    //     res.json({"responseCode" : 0,"responseDesc" : "Success"});
    // });

    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userPass = req.body.userpass;

    var collection = db.get('usercollection');

    collection.insert({
        "username" : userName,
        "useremail" : userEmail,
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
