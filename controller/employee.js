const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const result = await Employee.find();
  if(!result) {
    return res.status(400).json({
      message: "No employee found."
    })
  }
  res.json(result);
}

const addEmployee = async (req, res) => {
  if(!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "First and last names are required"
    });
  }

  try {
    const result = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}

const deleteEmployee = async (req, res) => {
  if(!req?.body.id) {
    return res.status(400).json({
      message: "ID parameter is required"
    });
  }
  const employee = await Employee.findOne({
    _id: req.body.id
  }).exec();

  if(!employee) {
    return res.status(400).json({
      message: `Employee ${req.body.id} is not found`
    });
  }
  // console.log(req.body.id);
  const result = Employee.deleteOne({
    _id: req.body.id
  }).exec();
  res.json(result);
}

const getEmployee = async (req, res) => {
  if(!req.params.id){
    return res.status(400).json({
      message: 'Employee ID is required'
    });
  }
  const employee = await Employee.findOne({
    _id: req.params.id
  }).exec();

  if(!employee) {
    return res.status(400).json({
      message: `No employee with id: ${req.params.id}`
    });
  }
  res.json(employee);
}

const updateEmployee = async (req, res) => {
  if(!req.body.id) {
    return res.status(400).json({
      message: "ID parameter is required"
    });
  }

  const employee = await Employee.findOne({
    _id: req.body.id
  });

  if(!employee) {
    return res.status(400).json({
      message: `Employee ${req.body.id} is not found.`
    });
  }

  if(req.body.firstName) employee.firstName = req.body.firstName;
  if(req.body.lastName) employee.lastName = req.body.lastName;
  if(req.body.username) employee.username = req.body.username;
  if(req.body.password) employee.password = req.body.password;

  const result = await employee.save();
  res.json(result);
}


module.exports = {
  getAllEmployees,
  addEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee
};
