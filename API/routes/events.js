const eventController = require("../controllers/event-hosting");
const authController = require("../controllers/auth");
const router = require("express").Router({mergeParams: true});

router.use(authController.isAuth);

router
  .route("/", (req, res, next) => {
    Object.assign(req.body, req.params);
    next();
  })
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);
router
  .route("/:id")
  .get(eventController.getEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

  module.exports = router;