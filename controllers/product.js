const Product = require('../models/product')
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.productById = (req,res,next,id) => {
    Product.findById(id).exec((err,product) => {
        if(err ){
            return res.status(400).json({
                error : "No such product found in db"
            })
        }
        req.product = product 
        next()
    })
}

exports.createProduct = (req, res) => {
      const form = new formidable.IncomingForm();
      form.keepExtensions = true;

      form.parse(req, (err, fields, file) => {
       if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
     }
    //destructure the fields
     const { name, description, price, category, stock } = fields;

     if (!name || !description || !price || !category || !stock) {
       return res.status(400).json({
         error: "Please include all fields"
       });
     }

    const  product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo= fs.readFileSync(file.photo.path);
       product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
   })
})}

exports.updateProduct= (req,res)=>{
    
   let form = new formidable.IncomingForm();
   form.keepExtensions = true; 
   form.parse(req, (err, fields, file )=>{
     if(err){
         return res.status(400).json({
             error : "Problem with image"
         })
     }
     

        let product = req.product;
        product = _.extend(product,fields)

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"       
            })
        }
        product.photo.data= fs.readFileSync(file.photo.path)
        product.photo.contentType = file.photo.type
    }
   product.save((err,product) => {
       if(err){
    return res.status(400).json({
        error : "Updatiom of product failed"
   })
       }
       res.json(product)
    })
})
}

exports.deleteProduct = (req,res) =>{
    const product = req.product
    console.log(product)    
    product.remove((err,deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error : "Deletion of product failed"
           })
           
        }
        res.json({
            error : "Successfull deletion"
       })
       
    })


}

exports.getProduct = (req,res) =>{
    req.product.photo = undefined
    return res.json(req.product)
}

exports.photo = (req,res,next) => {
    if(req.product.photo){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo)
    }
    next()
}
   
exports.getAllProducts = (req,res)=>{
   const limit = req.query.limit ? parseInt(req.query.limit) : 8
   const sortBy = req.query.sortBy ?req.query.sortBy : "_id"
    Product.find()  
    .exec((err, product)=>{
        if(err){
            return res.status(400).json({
                error : " No products found"
            })
        }
        res.json(product)
    })
}


exports.updateStock = (req,res,next) =>{
  const myOperations = req.body.order.products.map( prod => {
      return  {
          updateOne : {
              filter : {_id: prod._id},
              update : {$inc : {stock : -prod.count, sold: +prod.count}}
          }
      }
  })

  Product.bulkWrite(myOperations,{}, (err,products) =>{
      if(err){
          return res.status(400).json({
              error : "Bulk Operation failed"
          })
      }
  next()
  })

}

exports.getAllUniqueCategories = (req,res) =>{
    Product.distinct("Category", (err,category )=>{
          if(err){
              return res.status(400).json({
                  error : "No category found"
              }) 
            }
            res.json(category)
    })
}