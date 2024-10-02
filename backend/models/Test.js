const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', TestSchema);