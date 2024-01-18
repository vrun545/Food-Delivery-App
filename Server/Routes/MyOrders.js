const express = require("express");
const router = express.Router();
const Order = require('../Models/Orders');

router.post("/myOrderData", async (req, res) => {
  try {
    let eId = await Order.findOne({ email: req.body.email });
    if (eId) {
      res.json({ orderData: eId });
    } else {
      res.status(404).json({
        Error: "Data Not Found",
      });
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});


module.exports = router;