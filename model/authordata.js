const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/LibraryApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    title: String,
    country: String,
    dob : String,
    image : String,
    about : String,
    FamousWorks :String,
});
var AuthorData = mongoose.model('author', AuthorSchema);
module.exports = AuthorData;