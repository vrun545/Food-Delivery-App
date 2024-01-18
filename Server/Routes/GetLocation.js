const express = require("express");
const router = express.Router();
const axios = require("axios");


router.post("/getlocation", async (req, res) => {

  try {
    let lat = req.body.latlong.lat;
    let long = req.body.latlong.long;

    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`
    );

    // Check if the response is successful
    if (response.status === 200) {
      const components = response.data.results[0].components;
      const { village, county, state_district, state, postcode } = components;
      const location = `${village},${county},${state_district},${state}\n${postcode}`;
      res.send({ location });
    } 
    else {
      console.error(`Error in OpenCageData API: ${response.statusText}`);

      res.status(response.status).send("Error in fetching location data");
    }
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;