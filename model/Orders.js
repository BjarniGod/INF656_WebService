const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    menuItems: {
        type: Array,
        required: false,
    }
});

module.exports = mongoose.model("Orders", orderSchema, 'orders');