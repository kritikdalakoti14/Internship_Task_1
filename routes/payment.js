var express = require("express");
var router = express.Router();
const paypal=require('paypal-rest-sdk')
const Product_purchased=require('../models/purchased')
const usercontrollers=require('../controllers/usercontroller')

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': '************************',    //your client _id     process.env.client_id
    'client_secret': '******************************************************'  //  your client_secret       process.env.client_secret
  });



router.get('/payment',async (req,res)=>{
    
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `http://localhost:3000/success`,
            "cancel_url": "http://localhost:3000/fail" 
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "apple phone",
                    "sku": "001",
                    "price": "20.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": 20    // this total is static right now
            },
            "description": "This is the payment description of apple phone."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            
            console.log("Create Payment Response");
            //console.log(payment);
            for(var i=0;i<payment.links.length;i++)
            {
                if(payment.links[i].rel === 'approval_url')
                {
                    res.redirect(payment.links[i].href)
                }
            }
        }
    });


})


router.get('/success',async(req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": 20
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json,  async function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
         usercontrollers.admininfo.salescount=usercontrollers.admininfo.salescount+1  // sales count incrementing by 1 after every successfull purchase
         await usercontrollers.admininfo.save()

            //  below code is for storing history of the bought products of a user

         //       const user=req.user
         //       const userproduct=await Userproduct.findOne({user:user._id})  
         //       userproduct.purchased =userproduct.purchased.concat({product_id})
         //       await userproduct.save()



        res.send('Success payent completed!!')
      }
  });

  });

module.exports=router