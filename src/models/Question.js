const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  duration: Number,
  text: String,
  answers: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
});
module.exports = mongoose.model("questions", QuestionSchema);
