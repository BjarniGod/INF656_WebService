const MenuItem = require("../model/MenuItem");

const getAllMenuItems = async (req, res) => {
  const result = await MenuItem.find();
  if(!result) {
    return res.status(400).json({
      message: "No menu items found."
    })
  }
  res.json(result);
}

const addMenuItem = async (req, res) => {
  if(!req.body.itemName || !req.body.price) {
    return res.status(400).json({
      message: "Item name and price are required"
    });
  }

  try {
    const result = await MenuItem.create({
      itemName: req.body.itemName,
      description: req.body.description,
      price: req.body.price,
      itemImage: req.body.itemImage,
      category: req.body.category,
      calories: req.body.calories
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}

const deleteMenuItem = async (req, res) => {
  if(!req.body.id) {
    return res.status(400).json({
      message: "ID parameter is required"
    });
  }
  const menuItem = await MenuItem.findOne({
    _id: req.body.id
  });

  if(!menuItem) {
    return res.status(400).json({
      message: `Menu Item ${req.body.id} is not found`
    });
  }

  const result = menuItem.deleteOne({
    _id: req.body.id
  });
  res.json(result);
}

const getMenuItem = async (req, res) => {
  if(!req.params.id){
    return res.status(400).json({
      message: 'Menu Item ID is required'
    });
  }
  const menuItem = await MenuItem.findOne({
    _id: req.params.id
  });
  if(!menuItem) {
    return res.status(400).json({
      message: `No menu item with id: ${req.params.id}`
    });
  }
  res.json(menuItem);
}

const updateMenuItem = async (req, res) => {
  if(!req.body.id) {
    return res.status(400).json({
      message: "ID parameter is required"
    });
  }

  const menuItem = await MenuItem.findOne({
    _id: req.body.id
  });

  if(!menuItem) {
    return res.status(400).json({
      message: `Menu Item ${req.body.id} is not found.`
    });
  }

  if(req.body.itemName) menuItem.itemName = req.body.itemName;
  if(req.body.description) menuItem.description = req.body.description;
  if(req.body.price) menuItem.price = req.body.price;
  if(req.body.itemImage) menuItem.itemImage = req.body.itemImage;
  if(req.body.category) menuItem.category = req.body.category;
  if(req.body.calories) menuItem.calories = req.body.calories;

  const result = await menuItem.save();
  res.json(result);
}


module.exports = {
  getAllMenuItems,
  addMenuItem,
  deleteMenuItem,
  getMenuItem,
  updateMenuItem,
};
