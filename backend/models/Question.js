const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption: { type: Number, required: true },
    marks: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
