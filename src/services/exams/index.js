const express = require("express");
const examsRoutes = express.Router();
const Exam = require("../../models/Exam");
const Question = require("../../models/Question");
const AnswerSheet = require("../../models/AnswerSheet");
const schemas = require("../../lib/validationSchema");
const validationMiddleware = require("../../lib/validationMiddleware");
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const auth = require("../../lib/privateRoutes");

//routes

//GET /exams
//get all the exams
examsRoutes.get("/", async (req, res, next) => {
  try {
    const exams = await Exam.find().populate({
      path: "questions",
      populate: {
        path: "question",
        model: "questions",
      },
    });
    res.send(exams);
  } catch (err) {
    const error = new Error("there is a probelm finding exams");
    error.httpStatus = 404;
    next(error);
  }
});

//POST /exams/start
//start a new exams
examsRoutes.post("/start", auth, async (req, res, next) => {
  const { totalDuration } = req.body;
  let duration = 0;
  let index = 0;
  try {
    const allQuestions = await Question.find();
    console.log(allQuestions);
    //generate 5 random questions
    let questions = [];
    while (questions.length <= 4) {
      do {
        index = await getRandomInt(allQuestions.length);
        console.log(index);
        console.log(duration + allQuestions[index].duration > totalDuration);
      } while (duration + allQuestions[index].duration > totalDuration);
      duration = duration + allQuestions[index].duration;
      console.log(duration);
      console.log(totalDuration);
      if (!questions.includes(allQuestions[index]._id))
        questions.push(allQuestions[index]._id);
    }

    //create the array object for the exam
    questions = questions.map((question) => ({
      question: question,
      providedAnswer: false,
    }));

    //create an answer sheet for this exam
    const newAnswerSheet = new AnswerSheet({ answers: [] });
    const answerS = await newAnswerSheet.save();
    const newExam = new Exam({
      ...req.body,
      candidate: req.user._id,
      questions,
      answerSheet: answerS._id,
    });
    const exam = await newExam.save();
    answerS.exam_id = exam._id;
    answerS.save();

    res.send(exam);
  } catch (err) {
    console.log(err);
    const error = new Error("there is a probelm finding exams");
    error.httpStatus = 404;
    next(error);
  }
});

//GET /exam/:id;
//get exam by id
examsRoutes.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findById(id)
      .populate({
        path: "questions",
        populate: {
          path: "question",
          model: "questions",
        },
      })
      .populate("answerSheet");
    res.send(exam);
  } catch (err) {
    const error = new Error("there is a probelm finding exams");
    error.httpStatus = 404;
    next(error);
  }
});

//POST /exam/{id}/answer;
//get exam by id
examsRoutes.post("/:id/answer", async (req, res, next) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    let answerSheet = await AnswerSheet.findOne({ exam_id: id });
    const responded = answerSheet.answers.some(
      (answer) => answer.question == question
    );
    console.log(responded);
    if (answerSheet.answers.length > 5)
      return next(new Error("You responded to all the questions"));

    if (!responded) {
      answerSheet.answers.push({ ...req.body });
      answerSheet.save();
    } else {
      //handle error
      return next(new Error("You already responded to this question"));
    }
    res.send(answerSheet);
  } catch (err) {
    console.log(err);
    const error = new Error("there is a probelm finding exams");
    error.httpStatus = 404;
    next(error);
  }
});

//POST /exam/{id}/answer;
//get exam by id
examsRoutes.post("/:id/score", async (req, res, next) => {
  const { id } = req.params;
  try {
    const allQuestions = await Question.find();
    const exam = await Exam.findById(id);
    let answerSheet = await AnswerSheet.findOne({ exam_id: id });
    let corrected = answerSheet.answers.filter((answer) => {
      return allQuestions.some(
        (quest) =>
          quest._id == answer.question && quest.answers[answer.answer].isCorrect
      );
    });
    const score = await corrected.length;
    exam.score = score;
    exam.save();
    console.log(corrected.length);
    res.send(score.toString());
  } catch (err) {
    console.log(err);
    const error = new Error("there is a probelm finding exams");
    error.httpStatus = 404;
    next(error);
  }
});

//DELETE everything
examsRoutes.delete("/all", async (req, res, next) => {
  try {
    await Exam.deleteMany();
    await AnswerSheet.deleteMany();
    res.send("deleted");
  } catch (err) {
    const error = new Error("there is a probelm finding exams");
    error.httpStatus = 404;
    next(error);
  }
});

module.exports = examsRoutes;
