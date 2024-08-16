const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/
  return phoneNumberRegex.test(phoneNumber);
};

const querySchema = new mongoose.Schema({
    query:  String,
    raisedAt: {
        type: Number,
        default: function () {
            return new Date().getTime(); /* timestamp in miliseconds */
        }
    },
    resolvedAt: {
        type: Number,
    },
    status: {
        type: String
    }
})

const customerSchema = new mongoose.Schema({
    customerID: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        validate: [validateEmail, 'Kindly add a valid email'],
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true,
        validate: [validatePhoneNumber, 'Kindly add a valid mobile number'],
    },
    orders: [
        {
            orderID: String,
        }
    ],
    isSubscribed: {
        type: Boolean,
    },
    totalSpent: {
        type: Number,
    },
    location: {
        type: String
    },
    joined_at : {
        type: Number,
        default: function () {
          return new Date().getTime(); /* timestamp in miliseconds */
        }
    },
    queries: [
        {
            type: [querySchema]
        } 
    ]
})

module.exports = {
    customerModel: mongoose.model("customers", customerSchema)
 }