const jwt=require('jsonwebtoken')
const User=require('../models/user')


const auth= async(req,res,next)=>{
    try{
        const token = req.cookies['auth_token']
        const decoded=jwt.verify(token,'mysecret')
        const user=await (User.findOne({_id:decoded._id}))
        if(!user){
            throw new Error()
        }
        req.user=user
        next()
    }catch(e){
        res.status(401).send('You are not logged in!!')
    }
}

module.exports=auth