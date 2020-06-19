const express = require('express')
const router = express.Router()

const {productById, createProduct,deleteProduct,updateProduct,getProduct,photo,getAllProducts,getAllUniqueCategories} = require('../controllers/product')
const {isSignedin, isAdmin , isAuthenticated} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')


router.param("userId", getUserById)
router.param("productId", productById)

router.post("/product/create/:userId", isSignedin,  isAuthenticated ,isAdmin , createProduct)


router.delete("/product/:productId/:userId", isSignedin,  isAuthenticated ,isAdmin , deleteProduct)

router.put("/product/:productId/:userId", isSignedin,  isAuthenticated ,isAdmin , updateProduct)
router.get("/product/:productId",  getProduct)
router.get("/product/photo/:productId",  photo)

router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)

module.exports = router