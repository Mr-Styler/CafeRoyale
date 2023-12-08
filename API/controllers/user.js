const queryFunc = require('../utils/docFactoryFunc');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/user');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })

    return newObj;
}

exports.getAllUsers = queryFunc.getAll(User);

exports.getUser = queryFunc.getOne(User);

exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.session.user._id)

    res.status(200).json({
        status: "success",
        data: {
            document: user
        }
    })
})

exports.updateUser = queryFunc.updateOne(User);

exports.deleteUser = queryFunc.deleteOne(User);


exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) return next();

    console.log(req.files.image);

    if (req.files) {
        console.log("file")
        req.body.photo = req.files.image[0].filename
    }

    console.log(req.body)
    const filteredBody = filterObj(req.body, 'name', 'email', 'photo');
    console.log(filteredBody)

    const updatedUser = await User.findByIdAndUpdate(req.session.user._id, filteredBody, {new: true, runValidators: true});

    res.status(200).json({
        status: 'success',
        data: {
            document: updatedUser
        }
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.session.user._id, {active: false});

    res.status(200).json({
        status: 'success',
    })
})