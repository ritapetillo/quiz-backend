const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSheetSchema = new Schema({
  exam_id: { type: Schema.Types.ObjectId, ref: "exams" },
  answers: [
    {
      question: String,
      answer: Number,
      responded_at: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("answerSheets", AnswerSheetSchema);
