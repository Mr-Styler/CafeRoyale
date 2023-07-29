const orderController = require('./../controllers/order');
const router = require('express').Router({ mergeParams: true});

router.route('/', (req, res, next) => {
    Object.assign(req.body, req.params);
    next();
  })
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);

router.route('/:id')
    .get(orderController.getOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder)

module.exports = router