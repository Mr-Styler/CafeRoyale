const fakerCtrller = require("./../controllers/faker");
const router = require("express").Router();

router.post('/user', fakerCtrller.createDummyUser)
router.post('/blog', fakerCtrller.createDummyBlog)
router.post('/review', fakerCtrller.createDummyReview)
router.post('/recipe', fakerCtrller.createDummyRecipe)
router.post('/meal', fakerCtrller.createDummyMeal)

module.exports = router;
