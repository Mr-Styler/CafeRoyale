const viewCtrller = require("./../controllers/views");
const router = require("express").Router();

router.get('/', viewCtrller.getLandingPage)
router.get('/login', viewCtrller.getLoginPage)
router.get('/sign-up', viewCtrller.getSignUpPage)
router.get('/shop', viewCtrller.getShopPage)
router.get('/recipes', viewCtrller.getRecipePage)
router.get('/recipes/:id', viewCtrller.getRecipeShowPage)
router.get('/blogs', viewCtrller.getBlogsPage)
router.get('/blogs/:id', viewCtrller.getBlogShowPage)
router.get('/profile', viewCtrller.getProfilePage)
router.get('/table-booking', viewCtrller.getTableBookingForm)
router.get('/cart', viewCtrller.getCartPage)
router.get('/orders', viewCtrller.getOrdersPage)

module.exports = router;

