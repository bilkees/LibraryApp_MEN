const express = require('express');
const { add_book } = require('../json/add_book.json');
const { add_author } = require('../json/add_author.json');
const BookData = require('../model/bookdata');
const AuthorData = require('../model/authordata');
const multer = require('multer');
const path = require('path');



let app = express.Router();

//-------------------------------------------------- book--------------------//


app.get('/add_book', function (req, res) {  //add book
    res.render('addform', { olddata: {}, data: add_book, code: '1', update: false });
});

app.get('/update_book/:id', function (req, res) { //update book
    let id = req.params.id;
    console.log("Hello!" + id);
    BookData.findById({ _id: id })
        .then(function (book) {
            res.render('addform', { olddata: book, data: add_book, code: '1', update: true });
        });
});


app.post('/add_book', function (req, res) { //image add book
    // SET STORAGE
    // if (req.body.image) {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/images/'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    let upload = multer({ storage: storage }).single('image');
    upload(req, res, (err) => {
        console.log('add book kack', req.body);

        if (err) {
            console.log('upload err', err);
        } else {
            console.log('body', req.body, req.file)
            let item = {
                title: req.body.header1,
                pageCount: req.body.pageCount,
                publishedDate: req.body.publishedDate,
                image: req.file.originalname,
                about: req.body.text,
                language: req.body.language,
                author: req.body.author,
                categories: req.body.categories
            }
            if (req.body.updateFlag == 'true') {
                let id = req.body.bookid;
                let updateBook = { $set: item };

                BookData.updateOne({ _id: id }, updateBook)
                    .then(function (res) {
                        console.log('mongo updated successfully')
                    }).catch(function (error) {
                        console.log('mongo update error', error)
                    })
            } else {
                let book = BookData(item);
                book.save().then(function (data) {
                    console.log('data added', data);
                }).catch(function (error) {
                    console.log('error added', error);
                })
            }
        }
    });

});



//-------------------------------------------------- author--------------------//


app.get('/add_author', function (req, res) { //add author
    res.render('addform', { olddata: {}, data: add_author, code: '0', update: false });
});

app.get('/update_author/:id', function (req, res) { //update author
    let id = req.params.id;
    AuthorData.findById({ _id: id })
        .then(function (book) {
            res.render('addform', { olddata: book, data: add_author, code: '0', update: true });
        });
});

app.post('/add_author', function (req, res) {   //add image author
    // SET STORAGE
    // SET STORAGE
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/images/'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    let upload = multer({ storage: storage }).single('image');
    upload(req, res, (err) => {
        if (err) {
            console.log('upload err', err);
        } else {
            console.log('body', req.body, req.file)
            let item = {
                title: req.body.header1,
                country: req.body.country,
                image: req.file.originalname,
                about: req.body.text,
                dob: req.body.dob,
                FamousWorks: req.body.FamousWorks
            }
            if (req.body.updateFlag == 'true') {
                let id = req.body.bookid;
                let updateAuthor = { $set: item };

                AuthorData.updateOne({ _id: id }, updateAuthor)
                    .then(function (res) {
                        console.log('mongo updated successfully for author')
                    }).catch(function (error) {
                        console.log('mongo update error', error)
                    })
            } else {
                let author = AuthorData(item);
                author.save().then(function (data) {
                    console.log('data added', data);
                }).catch(function (error) {
                    console.log('error added', error);
                })
            }
        }
    });


});



module.exports = app;