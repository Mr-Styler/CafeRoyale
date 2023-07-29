const bookingController = require("./../controllers/table-booking");
const authController = require("./../controllers/auth");
const router = require("express").Router({mergeParams: true});

router.use(authController.isAuth);

router
  .route("/", (req, res, next) => {
    Object.assign(req.body, req.params);
    next();
  })
  .get(bookingController.getAllBookings)
  .post(bookingController.createTableBooking);
router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);


  module.exports = router;