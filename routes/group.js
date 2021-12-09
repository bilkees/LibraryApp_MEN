const express = require('express');
// const { books } = require('../json/books.json');
// const { authors } = require('../json/authors.json');
const BookData = require('../model/bookdata');
const AuthorData = require('../model/authordata');

let app = express.Router();

app.get('/books', function (req, res) {
    BookData.find()
        .then(function (book) {
            res.render('group', { data: book, header: 'BOOKS', search: 'book', code: '1', role: req.session.role });
        })
});

app.get('/books/:id', function (req, res) {
    let id = req.params.id;
    BookData.findById(id)
        .then(function (book) {
            res.render('single', { data: book, code: '1', role: req.session.role });
        });
});

//deletebook

app.post('/deletebook', function (req, res) {

    let id = req.body.id;
    BookData.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            res.send({ status: false, data: err });
        } else {


            console.log(req.body)
            res.send({ status: true });
        }
    });
});

//deleteauthor

app.post('/deleteauthor', function (req, res) {

    let id = req.body.id;
    AuthorData.remove({ _id: id }, (err, result) => {
        if (err) {
            res.send({ status: false, data: err });
        }
        else {

            console.log(req.body)
            res.send({ status: true });
        }
    });
});








app.get('/authors', function (req, res) {
    AuthorData.find()
        .then(function (author) {
            res.render('group', { data: author, header: 'AUTHORS', search: 'author', code: '0', role: req.session.role });

        })
});

app.get('/authors/:id', function (req, res) {
    let id = req.params.id;
    AuthorData.findById(id)
        .then(function (author) {
            res.render('single', { data: author, code: '0', role: req.session.role });
        });
});

module.exports = app;