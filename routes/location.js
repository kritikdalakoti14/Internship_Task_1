const express=require('express')
const router=express.Router()
const controllers=require('../controllers/usercontroller')
const auth = require('../authentication/auth')

router.get(
    '/getusers/:lat/:long',
    auth,
    controllers.getusersvialocation
    )

module.exports=router

// --------------  below is the frontend code we would write to access the latitude and longitude of a user for filtering user according to his location


// navigator.geolocation.getCurrentPosition((position)=>{
//     var loc={latitude:position.coords.latitude,longitude:position.coords.longitude}
//      console.log(loc)
//      fetch('/getusers/'+loc.latitude+'/'+loc.longitude)
//      })