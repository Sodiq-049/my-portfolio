const express = require('express');
const path = require('path'); // For resolving file paths
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Serve static files (like images, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware setup
app.use(cors({
  origin: ['http://127.0.0.1:5502', 'https://sodiq.hspace.cloud'], // Add both origins
  methods: ['GET', 'POST'], // Allow GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));
app.use(bodyParser.json());

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this if you're using another email provider
    auth: {
        user: process.env.EMAIL_USER, // From the environment variable
        pass: process.env.EMAIL_PASS, // From the environment variable
    },
});

// Routes for your application
app.get('/', (req, res) => {
    res.send('Welcome to My Portfolio!');
});

app.get('/about', (req, res) => {
    res.send('About Me');
});

app.get('/projects', (req, res) => {
    res.send('Projects page');
});

// Handle the email sending
app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log('Received email data:', req.body); // Debug log

    const mailOptions = {
        from: email, // Sender's email
        to: process.env.EMAIL_USER, // The receiver (your email)
        subject: subject, // Subject of the email
        text: `Message from ${name} (${email}):\n\n${message}`, // Message body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send message' });
        }
        console.log('Email sent successfully:', info.response); // Debug log
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

// Catch-all route for handling 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
