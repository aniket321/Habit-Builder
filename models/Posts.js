const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    tag: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    likes: [{
        type: String,
        required: true
    }
    ],
    desc: {
        type: String,
        required: true
    }
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;