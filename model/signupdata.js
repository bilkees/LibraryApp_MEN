const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/LibraryApp',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } );

const Schema = mongoose.Schema;

const SignUpSchema = new Schema({

    Username: String,
    Password: String,
    Email : String
                
});

var SignUpData = mongoose.model('signup',SignUpSchema);

module.exports = SignUpData;