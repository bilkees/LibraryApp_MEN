const express = require('express');
let app = express.Router();

const SignUpData = require('../model/signupdata');


//signin mongo check up and admin validation

app.get('/', function (req, res) {
    res.render('login');
});

//postlogin mongo validation

app.post('/', function (req, res) {

    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    // mongo check for user
    if (username == 'admin' && password == '1234') {
        req.session.role = 'admin';
        console.log("admin login success")
        res.send({ status: true });

    } else {
        SignUpData.findOne({ Username: username, Password: password }, function (err, user) {
            if (err) {
                res.send({ status: false, data: 'Response error. No Internet' });

            }
            else if (user) {
                console.log("user data", user)
                req.session.role = 'user';
                res.send({ status: true });
            } else {
                res.send({ status: false, data: 'NOT FOUND' });
            }

        });
    }
});

//signup data insert to mongo db

app.post('/signup', function (req, res) {

    console.log(req.body)
    var signup = SignUpData(req.body);
    signup.save().then(function (data) {
        console.log('data added', data);
        res.send({ status: true });
    }).catch(function (error) {
        console.log('error added', error);
        res.send({ status: false, data: 'Unexpected Error' });
    })

    //ends

});

module.exports = app;