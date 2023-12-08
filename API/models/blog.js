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

blogSchema.pre(/^find/, function (next) {
    this.populate({path: 'author', select: 'name photo'})

    next();
})

module.exports = mongoose.model('Blog', blogSchema)