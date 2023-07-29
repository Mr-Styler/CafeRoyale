const momgoose = require('mongoose');

const recipeSchema = new momgoose.Schema({
    name: {
        type: String,
        minLength: 10,
        trim: true
    },
    decription: {
        type: String
    },
    avgRating: {
        type: Number,
        default: 4.5,
        min: 1.0,
        max: 5.0
    },
    numRating: {
        type: Number,
        default: 0
    },
    author: {
        type: momgoose.Types.ObjectId,
        ref: 'User'
    },
    steps: [
        {
            title: {
                type: String,
                trim: true
            },
            body: {
                type: String,
            }
        }
    ],
    nutrients: [ String ]
},
{ timestamps: true }
)

module.exports = momgoose.model('Recipe', recipeSchema);