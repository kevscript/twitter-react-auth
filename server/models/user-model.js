const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String
});

const User = mongoose.model("User", userSchema);