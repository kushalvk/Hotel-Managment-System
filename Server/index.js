const express = require("express");
const mongoose = require("mongoose"); // for mongoDB
const cors = require("cors"); // access our backend side code to front end
require("dotenv").config();

const authenticationRoutes = require("./routers/authentication_route");
const bookingRouters = require("./routers/booking_route");
const ficilitesRouters = require("./routers/facilities_route");
const articlesRouters = require("./routers/articles_route");
const reviwRouters = require("./routers/review_route");
const faqRouters = require("./routers/faq_route");
const ratingRouters = require("./routers/rating_router");

const app = express();
const corsOptions = {
  origin: ['https://hotel-managment-system-client.vercel.app'], // Your frontend origin
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token', 'Origin'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json()); // to canvat user input data in to json formate for store in database

mongoose.connect(process.env.MONGODB_URI);

app.use(authenticationRoutes);
app.use(bookingRouters);
app.use(ficilitesRouters);
app.use(articlesRouters);
app.use(reviwRouters);
app.use(faqRouters);
app.use(ratingRouters);

app.get("/", (req, res) => {
  res.json(" Hello ");
});

app.listen(3001, () => {
  console.log("server is started on Port no : 3001");
});
