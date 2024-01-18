const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        await data.splice(0, 0, { Order_date: req.body.order_date });

        let eId = await Order.findOne({ 'email': req.body.email });

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } 
        else {
            await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } }).then(() => {
                res.json({ success: true });
            });
        }
    } 
    catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;