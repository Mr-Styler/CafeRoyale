const crypto = require('crypto');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/user');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })

    return newObj;
}

exports.signUp = catchAsync (async (req, res, next) => {
    
        const { email } = req.body;
        let user = await User.findOne({email})

        if (user) return next(new appError(`a user already exist with this email`, 403));

        user = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        });
    
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).select('+password');
    if(!foundUser || !(await foundUser.correctPassword(password, foundUser.password))) return next(new appError(`wrong or invalid credentials`));

    req.session.user = {
        _id : foundUser._id,
        name: foundUser.name,
        role: foundUser.role,
        photo: foundUser.photo
    };
    req.session.isAuth = true;
    res.status(200).json({
        status: 'success',
        data: {
            user: foundUser
        }
    });
});

exports.isAuth =  (req, res, next) => {
    if (req.session.isAuth) return next();
    return next(new appError(`You are not authenticated,. Please log in`))
};

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) throw err;
        return res.status(200).json({
            status: 'success',
            message: 'Successfully logged out!!!'
        })
    })
};

exports.restrictTo = (roles) => {
    return(req, res, next) => {
        console.log(roles, req.session.user.role);
        if(!roles.includes(req.session.user.role)) return next(new appError(`You are not allowed to perform this action.`, 400))
        next();
    }
};

exports.addToCart = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.session.user._id);

    user.addToUserCart(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            cart: user.cart
        }
    })
});

exports.getUsersCart = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.session.user._id).populate('cart.items.product');

    res.status(200).json({
        status: 'success',
        data: {
            cart: user.cart
        }
    })
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body
    // 1. find user using email
    const user = await User.findOne({email});

    if (!user) return next(new appError(`No user found with this ID`, 404))

    // 2. generate reset-token
    const token = await user.generateResetToken();
    await user.save({validateBeforeSave: false});

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/reset/${token}`;

    return res.status(200).json({
        status: 'success',
        message: `Link has been sent to your email. Url: ${resetUrl}`
    })
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // 1. verify if user token is valid3
    const user = await User.findOne({resetToken: hashedToken, resetExpires: {$gt: Date.now() }})

    if (!user) return next(new appError('Token is either invalid or expired'));

    // 2. set new password to user
    user.password = password;
    user.resetToken = undefined, user.resetExpires = undefined;
    await user.save();

    res.status(200).json({
        status: 'success',
        message: `password successfully resetted`
    })
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, confirmPassword, password } = req.body;
    const user = await User.findById(req.session.user._id).select('+password');

    if(!user && !(await user.correctPassword(currentPassword, user.password))) {
        return next(new appError(`passwords do not match`))
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'You have successfully changed your password'
    })
})