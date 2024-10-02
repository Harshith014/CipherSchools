const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/dashboard', protect, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.role}` });
});

module.exports = router;
