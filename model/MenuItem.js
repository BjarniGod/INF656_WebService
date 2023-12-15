const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    itemImage: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    calories: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model("MenuItem", menuItemSchema, 'menu_items');