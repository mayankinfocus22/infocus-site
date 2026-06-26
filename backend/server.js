const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// Security and utility middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes

app.post('/api/contact', async (req, res) => {
  const { name, email, org, role, interest, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, Email, and Message are required fields' });
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Infocus Website" <no-reply@infocusgroup.au>',
    to: process.env.EMAIL_TO || 'sahil@infocusgroup.au',
    subject: `New Contact Submission from ${name}`,
    text: `New Contact Submission from Infocus Group Website:

Name: ${name}
Email: ${email}
Organisation: ${org || 'N/A'}
Role: ${role || 'N/A'}
Sector of Interest: ${interest || 'N/A'}

Message:
${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #167B7D; border-bottom: 2px solid #167B7D; padding-bottom: 10px; margin-top: 0;">New Contact Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #167B7D; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Organisation:</td>
            <td style="padding: 8px 0;">${org || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Role:</td>
            <td style="padding: 8px 0;">${role || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Sector/Interest:</td>
            <td style="padding: 8px 0;">${interest || 'N/A'}</td>
          </tr>
        </table>
        
        <div style="background-color: #f9f9f9; border-left: 4px solid #167B7D; padding: 15px; margin-top: 20px;">
          <h3 style="margin-top: 0; color: #333;">What they are working on:</h3>
          <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
        </div>
      </div>
    `
  };

  try {
    // If SMTP is not configured, fall back to Mock Mode
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('--- [MOCK MODE] Contact Submission Details ---');
      console.log(`To: ${mailOptions.to}`);
      console.log(`From: ${mailOptions.from}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Payload:\n`, mailOptions.text);
      console.log('----------------------------------------------');
      
      return res.json({
        success: true,
        message: 'Thank you for your message! Our team will get back to you shortly. (Sent in Mock Mode)'
      });
    }

    // Real send
    await transporter.sendMail(mailOptions);
    console.log(`--- Email sent successfully to ${mailOptions.to} ---`);

    res.json({
      success: true,
      message: 'Thank you for your message! Our team will get back to you shortly.'
    });
  } catch (err) {
    console.error('Error sending contact submission email:', err);
    res.status(500).json({ error: 'Failed to send your submission. Please try again later.' });
  }
});

// Root endpoint info
app.get('/', (req, res) => {
  const hasSMTPConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  res.json({
    name: 'Infocus Group API',
    status: 'Running',
    emailMode: hasSMTPConfig ? 'SMTP Production' : 'Mock/Console Logger',
    endpoints: {
      'POST /api/contact': 'Submit a contact form query'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

