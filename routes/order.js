const express = require('express')
const router = express.Router()
const {isSignedin, isAdmin , isAuthenticated} = require('../controllers/auth')
const {getUserById,pushOrderInPurchaseList} = require('../controllers/user')

const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus} = require('../controllers/order')
const {updateStock} = require('../controllers/product')


router.param("userId", getUserById)
router.param("orderId", getOrderById)


router.post("/order/create/:userId", isSignedin, isAuthenticated, pushOrderInPurchaseList, updateStock , createOrder)
router.get("/order/all/:userId", isSignedin, isAuthenticated, getAllOrders)

router.get("/order/status/:userId", isSignedin, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:userId", isSignedin, isAuthenticated, isAdmin, updateStatus)



module.exports = router