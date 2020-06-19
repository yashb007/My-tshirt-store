const User = require('../models/user')
const Order = require('../models/order')

exports.getUserById= (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error : "No user  found in db"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined
     return res.json(req.profile)
}


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set :req.body},
        {new :true ,useFindAndModify : false},
        (err, user) =>{
            if(err || !user){
                return res.status(400).json({
                    error : "You are  not authorised to update "
                })
            }
            
           res.send(user)

            }
       
    )
}


exports.userPurchaseList = (req , res)=>{
Order.find({user : req.profile._id}).populate("user" , "_id name")
.exec((err,order) => {
          if(err){
              return    res.status(400).json({
                  error : " No order in this account"
              })
          }
          res.json(order)
})
}

exports.pushOrderInPurchaseList = (req, res , next)=>{
     let purchases = []
    req.body.order.products.forEach(product => {
     
        purchases.push({
            _id : product._id,
          name : product.name,
         description : product.description,
          category : product.category,
          quantity : product.quantity,
          amount : req.body.order.amount,
           transaction_id : req.body.order.transaction_id
        })
    });
 //storing to db
 
  User.findOneAndUpdate(
      { _id : req.profile._id},
      {$push : {purchases : purchases}},
      {new : true },
      (err,purchase) => {
           if(err){
               return res.status(400).json({
                   error : "Unable to save list"
               })
           }
      }
      
      )

   next()    
}