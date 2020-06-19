const mongoose = require('mongoose')
const crypto = require("crypto");
const uuidv1 = require('uuid/v1') 
const validator = require('validator')
const  userSchema = new mongoose.Schema({
 
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true,
    },
    lastname : {
        type : String,
        maxlength : 32,
        trim : true,
    },
    email: {
        type : String,
        required : true,
        trim : true,
        unique:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Provide a valid email")
            }
        }
    },
    userinfo : {
        type : String,
        trim : true
    },
    encry_password : {
        type : String,
        required : true,
        minlength : 7,
        
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    purchases : {
      type : Array,
      default : []
    }
});


userSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this.encry_password;
  })

userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  // return this.plainpassword === this._password;
  },

  securePassword : function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex");
    } catch (err) {
      return "";
    }
  }
}


module.exports = mongoose.model("User",userSchema)