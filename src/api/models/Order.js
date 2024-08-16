const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4()
    },
    customerID: {
        type: String,
        required: true,
    },
    productIDs: [
        {
            type: String,
            required: true,
        }
    ],
    status: {
        type: String,
        default: 'placed'
    },
    total: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String
    },
    order_placed_at : {
        type: Number,
        default: function () {
          return new Date().getTime(); /* timestamp in miliseconds */
        }
    },
    order_delivered_at : {
        type: Number
    }
})

module.exports = {
    orderModel: mongoose.model("orders", orderSchema)
 }