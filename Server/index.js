const express = require("express");
const mongoose = require("mongoose"); // for mongoDB
const cors = require("cors"); // access our backend side code to front end
const UserModel = require("./models/UserSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require("bcryptjs");
const BookingModel = require("./models/BookinSchema");
const FacilitiesModel = require("./models/FacilitiesSchema");
const ArticlesModel = require("./models/ArticlesSchema");
const ReviewModel = require("./models/ReviewsSchema");
const FAQModel = require("./models/FAQSchema");
const RatingModel = require("./models/RatingSchema");

const app = express();

const corsOptions = {
  origin: ['https://solid-space-adventure-5gq5457g7jv7c7xxj-5173.app.github.dev'], // Your frontend origin
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token', 'Origin'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://solid-space-adventure-5gq5457g7jv7c7xxj-5173.app.github.dev');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token, Origin');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(express.json()); // to canvat user input data in to json formate for store in database

mongoose.connect(process.env.MONGODB_URI);

// register
app.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  // bycrpt password
  const hash_password = await bcrypt.hash(password, 12); // 12 is the salt round

  UserModel.create({ username, email, password: hash_password, role })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// login
app.post("/login", (req, res) => {
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

// Add Booking
app.post("/booking", (req, res) => {

  const {
    name,
    email,
    phone,
    person,
    city,
    checkin,
    checkout,
    typeroom,
    price,
  } = req.body;

  BookingModel.create({
    name,
    email,
    phone,
    person,
    city,
    checkin,
    checkout,
    typeroom,
    price,
  })
    .then((booked) => res.json(booked))
    .catch((err) => res.json(err));
});

// get All bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.json(bookings);
  } catch (err) {
    res.json(err);
  }
});

// get bookings by name
app.get("/mybookings/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const bookings = await BookingModel.find({ name });
    res.json(bookings);
  } catch (err) {
    res.json(err);
  }
});

// get bookings by id
app.get("/upbookings/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await BookingModel.findById(id);
    res.json(bookings);
  } catch (err) {
    res.json(err);
  }
});

// update Booking
app.post("/updatebooking/:id", (req, res) => {
  const bookingId = req.params.id;

  const {
    email,
    phone,
    person,
    city,
    checkin,
    checkout,
    typeroom,
    price,
  } = req.body;

  const updateData = {
    email,
    phone,
    person,
    city,
    checkin,
    checkout,
    typeroom,
    price,
  };

  BookingModel.findByIdAndUpdate(bookingId, updateData)
    .then((updated) => res.json(updated))
    .catch((err) => res.json(err));
});

// delete booking
app.delete('/booking/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    console.log('Deleting booking ID:', bookingId);

    // Find the booking by ID and delete it
    const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);

    res.json(deletedBooking);
  } catch (err) {
    res.json(err);
  }
});

// get All Facilitied
app.get("/facilities", async (req, res) => {
  try {
    const facilities = await FacilitiesModel.find();
    res.json(facilities);
  } catch (err) {
    res.json(err);
  }
});

// add faciliti
app.post("/addfacility", (req, res) => {

  const {
    title,
    imageUrl,
    description,
  } = req.body;

  FacilitiesModel.create({
    title,
    imageUrl,
    description,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

// get All Articles
app.get("/articles", async (req, res) => {
  try {
    const addarticle = await ArticlesModel.find();
    res.json(addarticle);
  } catch (err) {
    res.json(err);
  }
});

// add Articles
app.post("/addarticle", (req, res) => {

  const {
    title,
    date,
    summary,
  } = req.body;

  ArticlesModel.create({
    title,
    date,
    summary,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

// get All Reviews
app.get("/reviews", async (req, res) => {
  try {
    const addreviews = await ReviewModel.find();
    res.json(addreviews);
  } catch (err) {
    res.json(err);
  }
});

// add Reviews
app.post("/addreview", (req, res) => {

  const {
    name,
    review,
  } = req.body;

  ReviewModel.create({
    name,
    review,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

// delete Review
app.delete('/review/:id', async (req, res) => {
  try {
    const reviewid = req.params.id;
    console.log('Deleting booking ID:', reviewid);

    // Find the booking by ID and delete it
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewid);

    res.json(deletedReview);
  } catch (err) {
    res.json(err);
  }
});

// get All FAQ
app.get("/faqs", async (req, res) => {
  try {
    const faqs = await FAQModel.find();
    res.json(faqs);
  } catch (err) {
    res.json(err);
  }
});

// add FAQ
app.post("/addfaq", (req, res) => {

  const {
    question,
    answer,
  } = req.body;

  FAQModel.create({
    question,
    answer,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

// get All Rating
app.get("/ratings", async (req, res) => {
  try {
    const ratings = await RatingModel.find();
    res.json(ratings);
  } catch (err) {
    res.json(err);
  }
});

// add Rating
app.post("/addrating", (req, res) => {

  const {
    name,
    star,
  } = req.body;

  RatingModel.create({
    name,
    star,
  })
    .then((added) => res.json(added))
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
app.get("/user", verifyToken, (req, res) => {
  UserModel.findOne({ username: req.user.username })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  res.json(" Hello ");
});

app.listen(3001, () => {
  console.log("server is started on Port no : 3001");
});
