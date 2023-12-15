const express = require('express');
const router = express.Router();
const menuItemController = require('../controller/menuItem');

/* POST new menu item. */
router
  .route("/")
  .get(menuItemController.getAllMenuItems)
  .post(menuItemController.addMenuItem)
  .put(menuItemController.updateMenuItem)
  .delete(menuItemController.deleteMenuItem);

router.route("/:id").get(menuItemController.getMenuItem);
// router.route("/:id").delete(menuItemController.deleteMenuItem);

module.exports = router;
