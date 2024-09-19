const express = require("express");
const UserModel = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const router = express.Router();

// register
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" }); // 400 for bad request
    }

    // Hash password
    const hash_password = await bcrypt.hash(password, 12); // 12 is the salt round

    // Create new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hash_password,
      role,
    });
    res.status(201).json(newUser); // 201 for resource created
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message }); // 500 for server error
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // Return 404 for user not found
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" }); // Return 401 for wrong password
    }

    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message }); // 500 for server error
  }
});

// update user
router.post("/updateuser/:id", (req, res) => {
  const userId = req.params.id;

  const { username, email } = req.body;

  const userdata = {
    username,
    email,
  };

  UserModel.findByIdAndUpdate(userId, userdata)
    .then((update) => res.json(update))
    .catch((err) => res.json(err));
});

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

  UserModel.findOneAndUpdate({ email }, { password: hash_password })
    .then((res) => {
      res.json(res);
    })
    .catch((err) => res.json(err));
});

// get All User
router.get("/alluser", async (req, res) => {
  try {
    const Users = await UserModel.find();
    res.json(Users);
  } catch (err) {
    res.json(err);
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Deleting booking ID:", userId);

    // Find the booking by ID and delete it
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    res.json(deletedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
