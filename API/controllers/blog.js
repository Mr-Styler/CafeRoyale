const queryFunc = require('./../utils/docFactoryFunc');
const Blog = require("./../models/blog");

exports.getAllBlog = queryFunc.getAll(Blog);

exports.getBlog = queryFunc.getOne(Blog);

exports.createBlog = queryFunc.createNew(Blog);

exports.updateBlog = queryFunc.updateOne(Blog);

exports.deleteBlog = queryFunc.deleteOne(Blog);