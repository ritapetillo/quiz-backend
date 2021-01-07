const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "student",
  },
  avatar: String,
  exams: { type: Schema.Types.ObjectId, ref: "bookings" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});

module.exports = mongoose.model("users", UserSchema);
