const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req,res) =>{
    const user = new User(req.body)
    user.save().then((user)=>{
       res.send({
           name : user.name,
           email : user.email,
           id : user._id
       })
    }).catch((e)=>{
        res.status(400).send(e)
    })
}

exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.send({ message : "User signout Successfully"})
}

exports.signin = (req,res)=>{
    const {email, password} = req.body;
    
    User.findOne({email}, (err, user) => {
        if(err || !user){
          return  res.status(400).json({
                error : "User does not exist"
                        })
        }
        if(!user.authenticate(password)){
           return  res.status(401).json({
                error : "Email and password do not match"
           
        })}
        const token = jwt.sign({_id : user._id},"billiondollar")
            res.cookie("token", token, {expire : new Date() +9999})
            const {_id, name , email, role} = user
            return res.send({token,user : {_id, name , email, role}})
        })
}


exports.isSignedin = expressJwt({
    secret :"billiondollar",
    userProperty : "auth"
})

exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error : "Access Denied"
        })
    }    
    next()
}


exports.isAdmin = (req,res,next) => {
   if(req.profile.role===0){
       return res.status(403).json({
           error : "You are not Admin , ACCESS DENIED"
       })
   } 
    
    
    next()
}