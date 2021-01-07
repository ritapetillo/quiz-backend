const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
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
});

module.exports = mongoose.model("exams", ExamSchema);
