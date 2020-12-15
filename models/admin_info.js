const mongoose=require('mongoose')

const admin_info=new mongoose.Schema({
    numberofloggedinusers:{type:Number,default:0},  // can be array of user id's too.
    salescount:{type:Number,default:0}  //  can be array of ordered id's too.
})

module.exports=mongoose.model('Admin_Info',admin_info)