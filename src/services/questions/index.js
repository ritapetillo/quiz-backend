const express = require("express");
const questionRoutes = express.Router();
const Question = require("../../models/Question");
const schemas = require("../../lib/validationSchema");
const validationMiddleware = require("../../lib/validationMiddleware");

//GET /questions
//get all the questions
questionRoutes.get("/", async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.send(questions);
  } catch (err) {
    const error = new Error("No questions found");
    error.httpStatus = 404;
    next(error);
  }
});

//POST /questions/new
//get all the questions
questionRoutes.post(
  "/",
  validationMiddleware(schemas.questionSchema),
  async (req, res, next) => {
    try {
      let newQuestion = new Question({
        ...req.body,
      });
      const question = await newQuestion.save();
      res.send(question);
    } catch (err) {
      const error = new Error("No questions found");
      error.httpStatus = 404;
      next(error);
    }
  }
);

//PUT /questions/edit/:id
//edit a question by id
questionRoutes.put(
  "/:id",
  validationMiddleware(schemas.questionSchema),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      let editedQuestion = {
        ...req.body,
      };
      const ques2edit = await Question.findByIdAndUpdate(id, editedQuestion);
      res.send(editedQuestion);
    } catch (err) {
      const error = new Error("No questions found");
      error.httpStatus = 404;
      next(error);
    }
  }
);

//DELETE /questions/edit/:id
//delete a question by id
questionRoutes.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const ques2delete = await Question.findByIdAndDelete(id);
    res.send(`${ques2delete._id} successfully deleted`);
  } catch (err) {
    const error = new Error("No questions found");
    error.httpStatus = 404;
    next(error);
  }
});

module.exports = questionRoutes;
