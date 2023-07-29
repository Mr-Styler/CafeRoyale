const recipeController = require('./../controllers/recipe');
const authController = require('./../controllers/auth');
const reviewRoute = require('./review');
const router = require('express').Router();

router.get('/', recipeController.getAllRecipe)
router.get('/:id', recipeController.getRecipe)

router.use(authController.isAuth)
router.use('/:recipeId/reviews', reviewRoute);

router.use(authController.restrictTo(['chef']));
router.post('/', recipeController.createRecipe);
router.route('/:id').patch(recipeController.updateRecipe).delete(recipeController.deleteRecipe);


module.exports = router;