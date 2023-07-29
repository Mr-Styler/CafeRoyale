const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String
    },
    rating: {
        type: Number,
        max: 5,
        min: 1
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    article: {
        articleType: {
            type: String,
            enum: ['Blog', 'Recipe']
        },
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'Blog' || 'Recipe'
        }
    }
},
{timestamps: true})

module.exports = mongoose.model('Review', reviewSchema);