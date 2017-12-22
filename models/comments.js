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
    person: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: { type: Date, default: Date.now }
});