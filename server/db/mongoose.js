const mongoose = require('mongoose');
//db cn
mongoose.connect('mongodb://localhost/crux', { useMongoClient: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;