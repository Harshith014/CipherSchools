const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const cors = require('cors');
const cron = require('node-cron');
const evaluateTestsAndSendEmails = require('./cron');


dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Database connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

// Cron job variable
let cronJob;

// API endpoint to activate the cron job
app.post('/api/start-cron', (req, res) => {
    if (!cronJob) {
      // Schedule the job to run every hour
      cronJob = cron.schedule('0 * * * *', async () => {
        await evaluateTestsAndSendEmails();
      });
      cronJob.start();
      return res.status(200).json({ message: 'Cron job activated and will run every hour.' });
    } else {
      return res.status(200).json({ message: 'Cron job is already running.' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
