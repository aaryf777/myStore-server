const express = require("express");
const router = express.Router();
const controller = require("../../controller/products.controller")
router.route('/create').post(controller.create)
router.route('/getAllProducts').get(controller.getProducts)
router.route('/getProduct/:productID').get(controller.getProductById)

module.exports = router;