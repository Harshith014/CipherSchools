const User = require('../models/User'); // Assuming the User model is in models/User.js
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;


    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({ username, email, password, role });

        await user.save();

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Utility function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' } // Token expires in 2 hour
    );
};
