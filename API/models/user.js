const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'A user must provide a name'],
        trim: true,
        minLength: [5, `A user's name must be at least 5 characters`]
    },
    password: {
        type: String,
        required: [ true, 'A user must provide a password'],
        trim: true,
        select: false,
        minLength: [5, 'password must be at least 5 characters']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Enter a valid email']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'chef']
    },
    cart: {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Meals'
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1
                }
            }
        ]
    },
    resetToken: {
        type: String
    },
    resetExpires: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (candidatePwd, userPwd) {
    return await bcrypt.compare(candidatePwd, userPwd)
};

userSchema.methods.generateResetToken = async function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetExpires = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

userSchema.methods.addToUserCart = async function (productObj) {
    const index = this.cart.items.findIndex(prod => prod.product.toString() === productObj.product)

    if (index > -1) {
        console.log(this.cart.items[index])
        if (productObj.quantity) this.cart.items[index].quantity = productObj.quantity
        else this.cart.items[index].quantity += 1

        return await this.save()
    };

    this.cart.items.push(productObj)
    return await this.save();
};

module.exports = mongoose.model('User', userSchema)