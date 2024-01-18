const express = require("express");
const app = express();
const router = express.Router();
const User = require("../Models/User");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Secret Key
const jwtSecret = "BlissBite";

// Validation
const checkValidate = [
  body("email", "Invalid Email").trim().isEmail().isLength({ min: 5 }),
  body("password", "Invalid Password").trim().isLength({ min: 5 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Check if user exists
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Invalid Credentials",
        });
      }

      // Compare passwords
      const pwdCompare = await bcrypt.compare(password, user.password);

      if (!pwdCompare) {
        return res.status(400).json({
          success: false,
          error: "Invalid Credentials",
        });
      }
      // If everything is successful, proceed with the rest of the logic
      req.user = user;
      next();
    } 
    catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  },
];

router.post("/login", checkValidate, async (req, res) => {
  try {
    // Access the user from the request object
    const { user } = req;

    const data = {
      user: {
          id: user.id
      }
    }

    // Generate and send JWT token if needed
    const token = jwt.sign(data, jwtSecret);

    res.status(200).json({
      success: true,
      result: "Login Successful !!!",
      token: token,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
