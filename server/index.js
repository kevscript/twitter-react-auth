require('dotenv').config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;

// connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log("connected to mongo db"); }
);

app.use(cookieSession({
  name: "session",
  keys: [process.env.COOKIE_KEY],
  maxAge: 24 * 60 * 60 * 100 // session will expire after 24 hours
}))

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);


// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookues: req.cookies
  });
});


// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));