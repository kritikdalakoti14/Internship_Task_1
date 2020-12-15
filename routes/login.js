const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../authentication/auth");
const controllers=require('../controllers/usercontroller')



router.get(
  "/logout", 
  auth,
  controllers.logout
)

router.post(
  "/register",
  controllers.register
)

router.post(
  "/signin",
  controllers.login
)

router.get(
  '/me',
  auth,
  (req,res)=>{res.send(req.user)}
)


module.exports = router;
