const mongoose = require('mongoose');
const tableBookingSchema = new mongoose.Schema({
    phone: {
        type: String,
    },
    table_no: {
        type: Number,
        min: 1,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    no_of_people: {
        type: Number,
        min: 1,
        required: true
    },
    message: {
        type: String,
        trim: true
    },
    booker: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {timestamps: true})

module.exports = mongoose.model('Booking', tableBookingSchema);