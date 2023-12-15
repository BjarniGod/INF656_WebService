const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders');

/* POST new menu item. */
router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.addOrder)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.route("/:id").get(orderController.getOrder);

module.exports = router;
