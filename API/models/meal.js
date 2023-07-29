const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A meal must have a name'],
        unique: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'A meal must have a price']
    },
    tags: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('Meal', mealSchema);