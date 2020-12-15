const mongoose=require('mongoose')
const user = require('./user')

const userproductschema=new mongoose.Schema({
    
    purchased:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dynamicProduct'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports=mongoose.model('Userproduct',userproductschema)