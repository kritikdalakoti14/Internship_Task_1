const express=require('express')
const router=express.Router()

const stripe = require('stripe')('your_Stripe_Api_Key');  //process.env.Stripe_key

const coupon = await stripe.coupons.create({
  duration: 'once',
  id: 'free_period',
  percent_off: 100,
});

// the code is all static as I can't integrate it with anything now due to less documentation in task.



const subscription = await stripe.subscriptions.create({
  customer: 'cus_4fdAW5ftNQow1a',
  items: [{price: 'price_CBb6IXqvTLXp3f'}],  // items from product schema would be coming here for which this coupon would be valid
  coupon: 'free_period',
});



const coupon = await stripe.coupons.retrieve(   //  retrieving a coupon by id
  'free_period'
);




// -------------  this is a demo gateway for stripe just to show the coupons integration with stripe.
//   ------------  the original payment is done via paypal!

const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: '{{PRICE_ID}}',   
      quantity: 1,
    }],
    mode: 'subscription',
    discounts: [{
      coupon: '{free_period}',  // coupon id of the coupon which we want to apply for a transaction
    }],
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });
