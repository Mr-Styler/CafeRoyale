const appError = require("../utils/appError");

// Handles CastErrors from the Database
const handleCastErrDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new appError(message, 400);
}

const handleDuplicateErrDB = (err) => {
    console.log('ERROR!!!!!!!!!!!!!!!')
    const value = Object.values(err.keyValue)
    const message = `Duplicate field value: ${value}, please use another value!`;
    return new appError(message, 400)
}

const handleValidationErrDB = (err) => {
    console.log('ERROR!!!!!!!!!!!!!!!')
    console.log('validation error')

    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new appError(message, 400)
}

const sendErrProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.error(`ERROR 🔥🔥💣💣💥💥💥`, err)
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })  
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    err.message = err.message || 'Something went wrong';

    if (process.env.NODE_ENV === 'production') {
        if (err.name === 'CastError') err = handleCastErrDB(err)
        if (err.code === 11000) err = handleDuplicateErrDB(err)
        if (err.name === 'ValidationError') err = handleValidationErrDB(err)
        
        sendErrProd(err, res)
    } else if (process.env.NODE_ENV === 'development') {
        sendErrDev(err, res)
    }
    // res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message,
    //     error: err,
    //     stack: err.stack
    // })
}