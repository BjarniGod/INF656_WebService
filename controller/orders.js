const Order = require("../model/Orders");

const getAllOrders = async (req, res) => {
  const result = await Order.find();
  if(!result) {
    return res.status(400).json({
      message: "No orders found."
    })
  }
  res.json(result);
}

const addOrder = async (req, res) => {
  if(!req.body.firstName || !req.body.email) {
    return res.status(400).json({
      message: "First name is required"
    });
  }

  try {
    const result = await Order.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      menuItems: req.body.menuItems,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}

const deleteOrder = async (req, res) => {
  if(!req.body.id) {
    return res.status(400).json({
      message: "ID parameter is required"
    });
  }
  const order = await Order.findOne({
    _id: req.body.id
  });

  if(!order) {
    return res.status(400).json({
      message: `Order id: ${req.body.id} is not found`
    });
  }

  const result = order.deleteOne({
    _id: req.body.id
  });
  res.json(result);
}

const getOrder = async (req, res) => {
  if(!req.params.id){
    return res.status(400).json({
      message: 'Order ID is required'
    });
  }
  const order = await Order.findOne({
    _id: req.params.id
  });
  if(!order) {
    return res.status(400).json({
      message: `No order with id: ${req.params.id}`
    });
  }
  res.json(order);
}

const updateOrder = async (req, res) => {
  if(!req.body.id) {
    return res.status(400).json({
      message: "ID parameter is required"
    });
  }

  const order = await Order.findOne({
    _id: req.body.id
  });

  if(!order) {
    return res.status(400).json({
      message: `Order ${req.body.id} is not found.`
    });
  }

  if(req.body.firstName) order.firstName = req.body.firstName;
  if(req.body.lastName) order.lastName = req.body.lastName;
  if(req.body.email) order.email = req.body.email;
  if(req.body.menuItems) order.menuItems = req.body.menuItems;

  const result = await order.save();
  res.json(result);
}


module.exports = {
  getAllOrders,
  addOrder,
  deleteOrder,
  getOrder,
  updateOrder,
};
