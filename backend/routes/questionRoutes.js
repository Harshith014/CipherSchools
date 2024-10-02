const express = require('express');
const { createQuestion, submitAnswer, createTest, getTest, getAllQuestions } = require('../controllers/questionController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create questions (Admin only)
router.post('/create', protect, isAdmin, createQuestion);
router.post('/createTest', protect, isAdmin, createTest);
router.get('/latest', protect, getTest);
router.post('/submit', protect, submitAnswer);
router.get('/all', protect, getAllQuestions);

module.exports = router;
