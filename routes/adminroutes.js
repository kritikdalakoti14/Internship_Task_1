const express=require('express')
const router=express.Router()
const usercontrollers=require('../controllers/usercontroller')
const auth=require('../authentication/auth')


const adminauth=(req,res,next)=>{
    if(req.user.isAdmin){
        next()
    }else{
        res.send('You are not logged in as Admin!')
    }
}


router.get(   // route for getting no of logged in users
    '/admin/getloginusers',
    auth,
    adminauth,
    (req,res)=>{
     res.status(200).send({No_of_loggedin_users_in_site:usercontrollers.admininfo.numberofloggedinusers.toString()})}  //no of logged in users
)

router.get(
    '/admin/getsalescount',
    auth,
    adminauth,
    (req,res)=>{res.send({Sales_Count:usercontrollers.admininfo.salescount.toString()})}  // no of products ordered 
)

module.exports=router
