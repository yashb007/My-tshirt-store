const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        trm : true,
        required : true,
        maxlength : 32,
        unique : true
    }

},
{
    timestamps : true
});


module.exports = mongoose.model("Category", categorySchema)