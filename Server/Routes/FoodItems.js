const express = require("express");
const router = express.Router();


router.post("/items", (req, res) => {
  try {
        res.send([global.food_items, global.food_category])
  } 
  catch (error) {
    res.send({
      "error": "Internal Server Error",
    });
  }
});



module.exports = router;