require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
const UserModel = require("./model/user");
app.post("/signup", async (req, res) => {
  console.log(req.body, "i am the request");
  try {
    const { first_name, email, password } = req.body;
    const userInfo = first_name && password && email;
    if (!userInfo) {
      res.status(400).send("All input is required");
    }
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      first_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err, "the error is here");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await UserModel.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
