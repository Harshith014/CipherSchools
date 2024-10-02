const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        option: Number,
        savedAt: { type: Date, default: Date.now }
    }],
    score: Number,
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    scoreEmailed: { type: Boolean, default: false },
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;