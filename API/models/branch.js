const mongoose = require('mongoose');
const branchSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            default: "Point",
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    }
})

branchSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Branch', branchSchema);