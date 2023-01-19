const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/Users.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Create New User

router.post(
  "/createuser",
  [
    body("email", "Enter valid email").isEmail(),
    body("name", "enter valid name ").isLength({ min: 3, max: 20 }),
    body("password", "password should be atleast of length 8").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //   console.log(errors) ; 

    try {
      

    if (!errors.isEmpty()) {
      // console.log("Error in data") ;

      return res.status(400).json({ errors: errors.array() });
    }
    // Check wether this email is already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      // console.log(user);
      return res
        .status(400)
        .json({ error: "This email is already registered" });
    }
    const salt = await bcrypt.genSalt(10); //generate salt
    const secPass = await bcrypt.hash(req.body.password, salt); // hashing password

    user = User(req.body);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    res.send(user); 
  } catch (error) {
    res.status(500).json("Internal error occured"); 
  }
  }
);

// Login

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log("Error in data") ;

      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check wether this email exist or not
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Enter the correct condentials" });
      }

    
      //  console.log(req.body.password) ;

      const passCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passCompare) {
        return res.status(400).json({ error: "Enter the correct condentials" });
      }
      res.status(200).json("Login");
    } catch (error) {
      res.status(500).json("Internal error occured");
    } 
    
  }
);

module.exports = router;
