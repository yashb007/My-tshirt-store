const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema

const productCartSchema = mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product",
    },
    name :String,
    count : Number,
    price : Number,
})



const orderSchema = new mongoose.Schema({

    products : [productCartSchema],
    transaction_id :{},
    amount : {
        type : Number,
    },
    address : {
        type : String,
    },
    status : {
        type : String,
        default : "Recieved " ,
        enum : ["Cancelled","Delivered","Processing","Recieved ","Shipped"]
    },
    updated : Date,
    user : {
        type : ObjectId,
        ref : "User",
    }
},{timestamps : true});



const Order = mongoose.model("Order", orderSchema)

const productCart = mongoose.model("ProductCart", productCartSchema)

module.exports = {Order,productCart};
