const User=require('../models/user')
const bcryptjs = require("bcryptjs");
const sendMail = require("../nodemailer/sendMail");
const Userproduct=require('../models/purchased')
const jwt=require('jsonwebtoken')
const Admin_info=require('../models/admin_info')

const findByEmailandPassword=(email,password)=>{
  return new Promise(async (resolve,reject)=>{
    const user=await User.aggregate([
      //stage 1
      {$match:{email}}
    ])
    if(!user.length){
      return reject('Email id not registered')
    }
    const isMatch = await bcryptjs.compare(password, user[0].password);
          if (!isMatch) {
            return reject("Email or password are incorrect!")
          }
     return  resolve(user[0])
  })
}


const generateauthtoken=(id)=>{
  const token=jwt.sign({_id:id},'mysecret')  //process.env.SECRET
  return token
}


exports.logout= async (req, res,next) => {
    try {
      res.cookie('auth_token','')
      res.send('logged out!!')
    } catch (e) {
      res.status(500).send(e);
    }
  }


exports.register=async (req, res) => {
    try {
      const user1=await User.findOne({email:req.body.email})
      if(user1)
      {
        return res.send('Email is already registered!!')
      }
      
        const {username,email,password,phoneno,isAdmin}=req.body
        const loc=req.body.location
        const user = new User({username,email,password,phoneno,isAdmin});//creating user
        
        const locationobject={type:'Point',coordinates:[loc.latitude,loc.longitude]}  // adding latitude and longitude to database
        user.location=locationobject
  
        const userproduct = new Userproduct({user:user._id});//creating cart schema for user
        await userproduct.save();
  
        user.products = userproduct._id;//storing cart id in user schema
        await user.save();
        sendMail(user.email);     // sending mail to user email id
        res.status(200).send(user)
    } catch (e) {
      res.status(400).send(e)
    }
  }  

  const admininfo=new Admin_info({})

  exports.login=async (req, res) => {
    try {
      const email=req.body.email
      const password=req.body.password
      findByEmailandPassword(email,password)
      .then( async (user)=>{
        res.cookie("auth_token",generateauthtoken(user._id) );
        admininfo.numberofloggedinusers=admininfo.numberofloggedinusers+1
        await admininfo.save()
        res.send(user)
      }).catch(e=>{
        res.send(e)
      })
    } catch (e) {
      res.status(500).send(e);
    }
  }

  exports.getusersvialocation=async (req,res)=>{
    const options={
            location:{
                $geoWithin:{
                    $centerSphere:[[req.params.lat,req.params.long],5/3963.2]  //searching all users within 5 km range of a sphere
                }  //  here the req.params.lat and req.params.long are the latitudes and longitudes of the current user from which the distance is measured
            }
    }
    
    const users=await User.find(options).sort()
    res.status(200).send(users)  //----------------------------------  users is printing near by users within 5 kms from the  given point
}

exports.admininfo=admininfo
