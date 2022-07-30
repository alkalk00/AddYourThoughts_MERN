const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectFile: String,
    likeCount:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const pSchema = mongoose.model('BlogPostsData',PostSchema);

module.exports = pSchema;