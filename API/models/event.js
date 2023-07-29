const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    host: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true
    },
    time: {
        type: Date
    },
    event_type: {
        type: String
    },
    description: {
        type: String
    },
    number_of_guests: {
        type: Number
    },
    location: {
        type: String
    }
})

module.exports = mongoose.model('Events', eventSchema);