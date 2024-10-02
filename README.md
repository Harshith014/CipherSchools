# MCQ Test Platform

A web-based platform for administering Multiple Choice Question (MCQ) tests with automated evaluation and result notification.

## Features

- User authentication with JWT
- Secure password hashing using bcryptjs
- State management with Context API
- Camera and microphone permissions for test proctoring
- Interactive MCQ test interface with timer and navigation
- Real-time camera preview during the test
- Automated test evaluation and email notification
- Role-based authorization
- Admin panel for question and test room management

## Tech Stack

### Frontend
- React.js with Vite
- shadcn UI components
- Tailwind CSS for styling

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose for ODM
- JWT for authentication
- bcryptjs for password hashing
- node-cron for scheduling tasks
- Nodemailer for sending emails
- Pug for email templates

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone [your-repo-link]
   cd [your-repo-name]
   ```

2. Set up the frontend
   ```
   cd frontend
   npm install
   ```

3. Set up the backend
   ```
   cd backend
   npm install
   ```

4. Create a `.env` file in the backend directory and add your configuration:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

### Running the Application

1. Start the frontend
   ```
   cd frontend
   npm run dev
   ```

2. Start the backend
   ```
   cd backend
   npm run dev
   ```

## Usage

### Test Account
For testing purposes, you can use the following credentials:
- Email: test@gmail.com
- Password: 123456

**Note:** To receive test results via email, please use a valid email address when registering.

### Admin Access
Details for accessing the admin panel can be added here.

## Additional Information

- The application uses cron jobs to evaluate test submissions every hour and send results via email.
- Email notifications use a Pug template for formatting.
- The platform supports role-based access control for users and administrators.

## Screenshots

![Alt Text](./src/assets/email-ss.png)

## Contributing

Instructions for how to contribute to your project can be added here.

## License

Specify your project's license here.

---

For more information or support, please contact [Your Name/Team Name].
