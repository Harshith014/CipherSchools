const Question = require('../models/Question');
const Submission = require('../models/Submission');
const Test = require('../models/Test');

// Create a new question (Admin only)
exports.createQuestion = async (req, res) => {
    const { question, options, correctOption, marks } = req.body;

    // Basic validation
    if (!question || !options || options.length < 2 || correctOption === undefined || marks === undefined) {
        return res.status(400).json({ message: 'All fields are required: question, options, correctOption, marks' });
    }

    try {
        // Create a new question document
        const newQuestion = new Question({
            question,
            options,
            correctOption,
            marks
        });

        await newQuestion.save();
        return res.status(201).json({ message: 'Question created successfully', question: newQuestion });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};


// Submit answer and calculate score
exports.submitAnswer = async (req, res) => {
    const { userId, answers } = req.body;
  
    try {
      // Fetch the latest test from the database
      const test = await Test.findOne().sort({ createdAt: -1 });
  
      // Check if the test exists
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }
  
      // Validate required fields
      if (!userId || !answers || answers.length === 0) {
        return res.status(400).json({ message: 'All fields are required: userId and answers' });
      }
  
      let score = 0;
  
      // Loop through each answer and check correctness
      for (const answer of answers) {
        const { questionId, option } = answer;
  
        // Fetch the corresponding question
        const question = await Question.findById(questionId);
  
        if (!question) {
          return res.status(404).json({ message: `Question with ID ${questionId} not found` });
        }
  
        // Check if the submitted option is correct
        if (question.correctOption === option) {
          score += question.marks;  // Award marks for correct answer
        }
      }
  
      // Create a new submission document
      const newSubmission = new Submission({
        testId: test._id,
        userId,
        answers,
        score,
        scoreEmailed: false
      });
  
      // Save the submission
      await newSubmission.save();
  
      return res.status(201).json({
        message: 'Submission successful',
        submission: newSubmission,
        score
      });
  
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };


// Create a new test (Admin only)
exports.createTest = async (req, res) => {
    const { title, description } = req.body;

    try {
        // Input validation
        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required: title and description' });
        }

        // Fetch all questions from the database
        const allQuestions = await Question.find({});

        if (allQuestions.length === 0) {
            return res.status(404).json({ message: 'No questions found in the database' });
        }

        // Extract all question IDs
        const allQuestionIds = allQuestions.map(question => question._id);

        // Create the new test with all question IDs
        const newTest = new Test({
            title,
            description,
            questions: allQuestionIds
        });

        // Save the test
        await newTest.save();

        return res.status(201).json({
            message: 'Test created successfully with all available questions',
            test: newTest
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};


exports.getTest = async (req, res) => {
    try {
        // Fetch the latest test from the database
        const test = await Test.findOne().sort({ createdAt: -1 }).populate('questions');

        // Check if the test exists
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        return res.status(200).json({
            message: 'Test fetched successfully',
            test: test
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().select('question options');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};