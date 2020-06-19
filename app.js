require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const stripe = require('stripe')
const authRoutes = require('./routes/auth') 
const userRoutes = require('./routes/user') 
const categoryRoutes = require('./routes/category') 
const productRoutes = require('./routes/product') 
const orderRoutes = require('./routes/order') 
const stripeRoutes = require('./routes/stripepayment') 


mongoose.connect("mongodb+srv://yashbansal:jsXXBoZ374Y66mfy@cluster0-xrqav.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true,
useCreateIndex : true,
useUnifiedTopology: true}).then(() =>{
    console.log("DB CONNECTED")
}).catch(()=>{
    console.log("OOOPS NOT CONNECTED")
})

const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api" ,authRoutes);
app.use("/api" ,userRoutes);
app.use("/api" ,categoryRoutes);
app.use("/api" ,productRoutes);
app.use("/api" ,orderRoutes);
app.use("/api" ,stripeRoutes);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
const port = process.env.PORT || 8000;
app.listen(port ,()=> {
    console.log(`Server is running at ${port}`)
})