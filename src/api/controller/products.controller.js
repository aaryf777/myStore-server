const {productModel} = require('../models/Product')

const throwError = (res,error) => {
    res.status(500).json({
        status: 'failed',
        errorMessage: error
    })
}
exports.create = async(req,res,next) => {
    try {
        const product = req.body;
        if(!product) {
            throw new Error('Invalid Payload')
        }
        const user = await productModel.create({...req.body});
        res.status(201).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        console.log('error - ',error);
        
        throwError(res,error)
    }
}
exports.edit = async(req,res,next) => {
    try {
        const {productID, ...data} = req.body;
        if(!productID) {
            throw new Error('Invalid Payload')
        }
        const product = await productModel.findOneAndUpdate({productID},{$set: data});
        res.status(201).json({
            status: 'success',
            message: 'updated user successfully',
            data: product
        })
    } catch (error) {
        console.log('error - ',error)
        throwError(res,error)
    }
}
exports.getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({},{category:1,title:1,price:1,productID:1,ImgUrls:1,status:1,quantity:1})
        console.log('products - ',products);
        
        res.status(200).json({
            status: 'success',
            data: products
        })
    } catch (error) {
        throwError(res,error)
    }
}

exports.getProductById = async (req, res, next) => {
    try {
        const {productID} = req.params;
        if(!productID) throw new Error('productID not found')
        const product = await productModel.find({productID})
        res.status(200).json({
            status: 'success',
            data: product
        })
    } catch (error) {
        throwError(res,error)
    }
}

exports.searchFilter = async (req, res, next) => {
    try {
        const {search} = req.params;
        if(!search) throw new Error('Missing search query')
        const productList = await productModel.find({ $or: [{productID: {$regex : search}}, {title: {$regex : search}}, {description: {$regex : search}}]})
        res.status(200).json({
            status: 'success',
            data: productList
        })
    } catch (error) {
        throwError(res,error)
    }
}