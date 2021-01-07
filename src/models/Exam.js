const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new mongoose.Schema({
  candidate: { type: Schema.Types.ObjectId, ref: "users" },
  examDate: {
    type: Date,
    default: Date.now(),
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  totalDuration: Number,
  questions: [
    {
      question: { type: Schema.Types.ObjectId, ref: "questions" },
      providedAnswer: { type: Boolean, default: false },
    },
  ],
  answerSheet: { type: Schema.Types.ObjectId, ref: "answerSheets" },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("exams", ExamSchema);
