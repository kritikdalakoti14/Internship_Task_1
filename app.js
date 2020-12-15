const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//FOR POSTMAN
app.use(express.json());

//  <----------->   ROUTES   <-------------->

const userloginRoutes = require("./routes/login");
const locationroutes=require('./routes/location')
const paymentroutes=require('./routes/payment')
const adminroutes=require('./routes/adminroutes')


// <------------>  DATABASE   <-------------->
require("./db/mongoose");


//<------------->  GETTING DATA FROM POST REQUEST  <---------------->
app.use(bodyParser.urlencoded({ extended: true }));

//<------------->  SETTING COOKIES TO THE BROWSER  <----------------->
app.use(cookieParser());



app.use("/user", userloginRoutes);
app.use(locationroutes)
app.use(paymentroutes)
app.use(adminroutes)

const PORT = process.env.PORT || 3000;



app.listen(PORT, function () {
  console.log(`Server has started at ${PORT}`);
});
