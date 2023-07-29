const queryFunc = require('./../utils/docFactoryFunc');
const Review = require('./../models/review');

exports.getAllReview = queryFunc.getAll(Review);

exports.getReview = queryFunc.getOne(Review);

exports.createReview = queryFunc.createNew(Review);

exports.updateReview = queryFunc.updateOne(Review);

exports.deleteReview = queryFunc.deleteOne(Review);