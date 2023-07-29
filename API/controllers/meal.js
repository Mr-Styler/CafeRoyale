const queryFunc = require('./../utils/docFactoryFunc');
const Meal = require('./../models/meal');

exports.getAllMeals = queryFunc.getAll(Meal);

exports.getMeal = queryFunc.getOne(Meal);

exports.createMeal = queryFunc.createNew(Meal);

exports.updateMeal = queryFunc.updateOne(Meal);

exports.deleteMeal = queryFunc.deleteOne(Meal);