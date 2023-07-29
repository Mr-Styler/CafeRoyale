const mealController = require('./../controllers/meal');
const authController = require('./../controllers/auth');
const router = require('express').Router()

router.use((req, res, next) => {
    console.log(req.session);
    next();
})

router.route('/').get(mealController.getAllMeals).post(authController.isAuth, mealController.createMeal);

router.route('/:id').get(mealController.getMeal).patch(authController.isAuth, mealController.updateMeal).delete(authController.isAuth, mealController.deleteMeal);

module.exports = router;