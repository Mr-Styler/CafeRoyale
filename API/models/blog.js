const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 5
    },
    body: {
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true});

module.exports = mongoose.model('Blog', blogSchema)