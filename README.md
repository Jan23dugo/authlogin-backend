Advanced Auth System - Backend API

The server-side application for the Advanced Authentication System. This API handles secure user data, JWT generation, 2FA verification (Google Authenticator), and email services.

Tech Stack
* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB (Mongoose)
* Security: BCrypt, JWT, Speakeasy (2FA)
* Email: Nodemailer

Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:
`PORT` - (e.g., 5000)
`MONGODB_URI` - Your MongoDB connection string
`JWT_SECRET` - Your secret key for signing tokens
`EMAIL_USER` - Your email address
`EMAIL_PASS` - Your email app password
`CLIENT_URL` - The URL of your frontend (e.g., http://localhost:3000)

Getting Started
1. Clone the repository
   ```bash
   [git clone [https://github.com/yourusername/auth-backend.git](https://github.com/yourusername/auth-backend.git)](https://github.com/Jan23dugo/authlogin-backend.git)

2. Install dependencies
   npm install

3. Start the server
   npm start

API Endpoints
Method, Endpoint, Description
POST,/api/auth/register,Register a new user
POST,/api/auth/login,Login and receive JWT
POST,/api/auth/verify-email,Verify user email account
POST,/api/auth/2fa/generate,Generate QR code for 2FA
POST,/api/auth/2fa/verify,Verify 2FA token
