const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectFile: String,
    likes:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const pSchema = mongoose.model('BlogPostsData',PostSchema);

module.exports = pSchema;