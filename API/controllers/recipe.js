const queryFunc = require('./../utils/docFactoryFunc');
const Recipe = require("../models/recipe");

exports.getAllRecipe = queryFunc.getAll(Recipe);

exports.getRecipe = queryFunc.getOne(Recipe);

exports.createRecipe = queryFunc.createNew(Recipe);

exports.updateRecipe = queryFunc.updateOne(Recipe);

exports.deleteRecipe = queryFunc.deleteOne(Recipe);