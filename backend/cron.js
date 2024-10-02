const Submission = require('./models/Submission');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const pug = require('pug');
const path = require('path');
require('dotenv').config()


// Check if EMAIL and EMAIL_PASSWORD are loaded
if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    console.error('ERROR: EMAIL or EMAIL_PASSWORD environment variable is missing!');
    process.exit(1); // Exit the process if credentials are missing
  }


const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email provider
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD // Your password or app password
  }
});

const sendEmail = async (userEmail, score) => {
  const templatePath = path.join(__dirname, './views/template.pug');
  const html = pug.renderFile(templatePath, { score });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Your Test Score',
    html: html
  };

  await transporter.sendMail(mailOptions);
};

const evaluateTestsAndSendEmails = async () => {
  try {
    // Find all submissions where the score hasn't been emailed yet
    const submissions = await Submission.find({ scoreEmailed: false });

    if (!submissions || submissions.length === 0) {
      console.log('No submissions to evaluate.');
      return;
    }

    // Loop through each submission to evaluate and send the email
    for (const submission of submissions) {
      // Fetch the user information
      const user = await User.findById(submission.userId);
      // if (!user) {
      //   console.log(`User with ID ${submission.userId} not found.`);
      //   continue;
      // }

      // Email the score to the user
      await sendEmail(user.email, submission.score);

      // Update the submission to mark the score as emailed
      submission.scoreEmailed = true;
      await submission.save();

      // console.log(`Email sent to ${user.email} with score ${submission.score}`);
    }

  } catch (error) {
    console.error('Error evaluating tests:', error);
  }
};

module.exports = evaluateTestsAndSendEmails;
