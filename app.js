const express = require('express');
const session = require('express-session');
let app = express();

const port = process.env.PORT || 15588;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view')
app.use(express.urlencoded({ extended: true })); //middleware portion for adding data

app.use(session({      //session creation
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));



const login = require('./routes/login'); //login page
app.use('/login', login);

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
});

var authenticate = function (req, res, next) {  //admin or user
    if (req.session.role == 'admin' || req.session.role == 'user') {
        next();
    } else {
        res.redirect('/login');
    }
}

app.use(authenticate);

const home = require('./routes/home'); //homepage
app.use('/', home);

const group = require('./routes/group'); //books and author group page
app.use('/group', group);

const add = require('./routes/addform'); //add book and add author page
app.use('/add', add);




app.listen(port, () => {
    console.log("Server ready at" + port)
});
