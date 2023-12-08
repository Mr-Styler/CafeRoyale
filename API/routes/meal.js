const mealController = require('./../controllers/meal');
const authController = require('./../controllers/auth');
const router = require('express').Router()

router.route('/').get(mealController.getAllMeals)
router.route('/:id').get(mealController.getMeal)

router.use(authController.restrictTo(['admin']))

router.post('/', authController.isAuth, mealController.createMeal);
router.route('/:id').patch(authController.isAuth, mealController.updateMeal).delete(authController.isAuth, mealController.deleteMeal);

module.exports = router;