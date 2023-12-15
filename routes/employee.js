const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee');

/* POST new menu item. */
router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.addEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
