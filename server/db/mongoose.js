const mongoose = require('mongoose');
//db cn
//mongoose.connect('mongodb://localhost/crux', { useMongoClient: true });
mongoose.connect('mongodb://admin:admin@ds163836.mlab.com:63836/crux', { useMongoClient: true });


mongoose.Promise = global.Promise;
module.exports = mongoose;