const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const Razorpay = require('razorpay');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_51H1234567890',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_secret_key'
});

// Create Razorpay order
router.post('/createOrder', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    
    const options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  let eId = await Order.findOne({ 'email': req.body.email });
  
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
        payment_id: req.body.payment_id,
        order_id: req.body.order_id
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { 
          $push: { order_data: data },
          $set: { 
            payment_id: req.body.payment_id,
            order_id: req.body.order_id
          }
        }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  }
});

router.post('/myOrderData', async (req, res) => {
  try {
    let eId = await Order.findOne({ 'email': req.body.email });
    res.json({ orderData: eId });
  } catch (error) {
    res.status(500).json({ error: "Error", message: error.message });
  }
});

module.exports = router;