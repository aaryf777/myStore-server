const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const sizeSchema = new mongoose.Schema({
    name:  String,
    quantity: String
})
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is mandatory'],
    },
    productID: {
        type: String,
        unique: true,
        required: true,
        default: () => uuidv4()
    },
    description: {
        type: String
    },
    ImgUrls: [
        {
            type: String
        }
    ],
    price: {
        type: Number,
        required: [true, 'Product price is mandatory']
    },
    comparePrice: {
        type: Number
    },
    category: {
        type: String,
        required: [true, 'Product category is mandatory']
    },
    tags: [
        {
            type: String
        }
    ],
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    },
    weight: {
        type: Number
    },
    sizes: [
        {
            type: [sizeSchema]
        }
    ]
})

module.exports = {
    productModel: mongoose.model("products", productSchema)
 }