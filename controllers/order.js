
const {Order , productCart }= require('../models/order')


exports.getOrderById = (req,res,next , id) =>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order) => {
        if(err || !order){
            return res.status(400).json({
                error : "No order  found in db"
            })
        }
        req.order = order
        next()
    })

}


exports.createOrder = (req,res)=>{

     req.body.order.user = req.profile
     const order = new Order(req.body.order)
     order.save((err, order)=>{
         if(err){
             return res.status(400).json({
                 error : "Faled to save order"
             })
         }
         res.json(order)
     })
}


exports.getAllOrders = (req,res) =>{
    Order.find()
    .populate("User" , "name _id ")
    .exec((err, orders)=>{
        if(err){
            return res.status(400).json({
                error : "Faled to Show orders"
            })
        
        }
        res.json(order)
    })
}

exports.getOrderStatus = (req,res) =>{
   res.json(Order.schema.path("status").enumValues)
}
  
exports.updateStatus = (req,res)=>{
      Order.update(
          {_id : req.body.orderId},
          {$set : {status : req.body.status}},
          (err,status) =>{
              if(err){
                  return res.status(400).json({
                      error : "Can not update status"
                  })
              }
              res.json(order)
          }
      )
}