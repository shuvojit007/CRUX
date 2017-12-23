const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comments', CommentsSchema);