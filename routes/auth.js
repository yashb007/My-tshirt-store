var express = require('express')
var router = express.Router()
const {signout, signup , signin, isSignedin} = require("../controllers/auth")

router.post("/signup", signup)
router.get("/signout", signout)
router.post("/signin", signin)


router.get("/testroute", isSignedin, (req,res)=>{
    res.json(req.auth)
})


module.exports = router;