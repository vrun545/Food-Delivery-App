const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

const jwtSecret = "BlissBite";


// Validation
const checkValidate = [
  body("email", "Invalid Email").trim().isEmail().isLength({ min: 5 }),
  body("name", "Invalid Name").trim().isLength({ min: 5 }),
  body("location", "Invalid Location").trim().isLength({ min: 5 }),
  body("password", "Invalid Password").trim().isLength({ min: 5 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  },
];


router.post("/createuser", checkValidate, async (req, res) => {

  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this Email Already Exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      location: req.body.location,
    });

    // Create and send a JWT token
    const data = {
      user: {
        id: newUser.id,
      },
    };
    const token = jwt.sign(data, jwtSecret);
    res.json({ success: true, token, result: "User Added Successfully!!!" });
  } 
  catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
