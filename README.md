# MCQ Test Platform

A web-based platform allowing students to take multiple-choice question (MCQ) tests with user authentication, test administration, and result evaluation, built using the MERN stack (MongoDB, Express, React, Node.js).

Table of Contents
Features
Tech Stack
Installation
Usage
Admin Panel
Email Service
Testing
License
Features
User Authentication: Secure login and registration using JWT, with passwords hashed by bcryptjs.
Proctoring: After login, the platform requests camera and microphone permissions for proctoring during the test.
MCQ Test Interface: A user-friendly interface built with shadcn UI. The test includes a timer, a camera preview interface, and options to navigate freely between 10 MCQs. Users can save answers as they select options.
Admin Panel: Role-based authorization allows administrators to create test questions and manage test rooms.
Email Notifications: Using node-cron and Nodemailer, the system evaluates tests and sends users their scores via email.
State Management: Context API is used for managing user state throughout the application.
Role-Based Authorization: Secure role-based access to specific features and functionalities (e.g., admin panel).
Cron Jobs: node-cron is used to schedule evaluation tasks every hour and send test results via email using Nodemailer with Pug templates.
Tech Stack
Frontend: React.js, shadcnUI, Vite, Tailwind CSS, Context API
Backend: Node.js, Express.js, MongoDB
Authentication: JWT, bcryptjs for password hashing
Email Service: Nodemailer with Pug templates
Cron Jobs: node-cron
Database: MongoDB (Mongoose for data modeling)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/mcq-platform.git
cd mcq-platform
Set up environment variables: Create a .env file in the backend and add the necessary environment variables such as MongoDB URI, JWT secret, email credentials for Nodemailer, etc.

Install dependencies:

For the frontend:
bash
Copy code
cd frontend
npm install
For the backend:
bash
Copy code
cd backend
npm install
Run the project:

Frontend:
bash
Copy code
cd frontend
npm run dev
Backend:
bash
Copy code
cd backend
npm run dev
Usage
User Registration and Login: Upon registration, users can log in and access the MCQ tests. The login status is maintained via JWT stored in context API, which conditionally renders the login, register, and logout buttons.

Taking the Test: After successful authentication, users can grant permission for their camera and microphone to start the test. The MCQ interface includes a camera preview and a timer. Users can freely navigate between the 10 MCQs and save their answers.

Submitting the Test: After submitting the test, users are redirected to a completion page with a message indicating the test is completed. Test results are evaluated using a cron job that runs every hour, and results are sent via email.

Admin Panel
Administrators can access the admin panel to create new MCQ tests and manage test rooms. Role-based access control ensures only users with admin privileges can perform these actions.

Email Service
Results are automatically evaluated and sent to users via email using Nodemailer.
Emails are sent based on the cron job that runs every hour, triggered 5 minutes after test completion.
The email template is rendered using Pug, ensuring a clean and professional format.
Testing
To test the platform, use the following credentials:

Test User:

Email: test@gmail.com
Password: 123456
To Create Your Own Account:

Username: Your choice
Email: Use a valid email (for receiving results)
Password: Create a password of your choice
Note: If the email you use is invalid or fake, you won’t receive any email regarding test results.

License
This project is licensed under the MIT License.
