const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    image: [{
        type: String
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);