const express = require("express");
const UserModel = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const router = express.Router();

// register
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  // bycrpt password
  const hash_password = await bcrypt.hash(password, 12); // 12 is the salt round

  UserModel.create({ username, email, password: hash_password, role })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username: username }) // to find particular user
    .then(async (user) => {
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password); // await is compalsory, it,s return a promice
        if (isMatch) {
          const token = await user.generateAuthToken();
          res.json({ user, token });
        } else {
          res.json("incorrect password");
        }
      } else {
        res.json("no record existed");
      }
    });
});

// update user
router.post("/updateuser/:id", (req, res) => {
  const userId = req.params.id;

  const { username, email } = req.body;

  const userdata = {
    username, email,
  }

  UserModel.findByIdAndUpdate(userId, userdata)
  .then((update) => res.json(update))
  .catch((err) => res.json(err))
})

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.json({ error: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.json({ error: "Failed to authenticate token." });
    }
    req.user = decoded;
    next();
  });
};

// Route to get logged-in user data
router.get("/user", verifyToken, (req, res) => {
  UserModel.findOne({ username: req.user.username })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => res.json(err));
});

// forget Password
router.post("/forget", async (req, res) => {
  const { email, password } = req.body;
  const hash_password = await bcrypt.hash(password, 12);

  UserModel.findOneAndUpdate(
    { email: email },
    { password: hash_password },
    { new: true }
  )
    .then((res) => {
      res.json(res);
    })
    .catch((err) => res.json(err));
});

module.exports = router;