const userController = require("./../controllers/user");
const authController = require("./../controllers/auth");
const bookingRoute = require('./booking');
const eventRoute = require('./events');
const orderRoute = require('./order');
const router = require("express").Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.use(authController.isAuth)
router.post('/forgot-password', authController.forgotPassword)
router.patch('/reset/:token', authController.resetPassword)
router.post('/logout', authController.logout);
router.route('/cart').post(authController.addToCart)

router.use('/:bookerId/bookings', bookingRoute);
router.use('/:host/events', eventRoute);
router.use('/:userId/orders', orderRoute);

router.use(authController.restrictTo(['admin']))
router.route("/").get(userController.getAllUsers);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
