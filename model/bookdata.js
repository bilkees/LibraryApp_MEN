const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/LibraryApp',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } );

const Schema = mongoose.Schema;

const BookSchema = new Schema({

    title: String,
    pageCount: String,
    publishedDate : String,
    image : String,
    about : String,
    language :String,
    author : String,
    categories : String

            


});

var BookData = mongoose.model('book',BookSchema);

module.exports = BookData;