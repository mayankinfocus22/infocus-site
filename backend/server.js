const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/infocus';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected successfully to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema for Contact Submissions
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  org: { type: String, default: '' },
  role: { type: String, default: '' },
  interest: { type: String, default: '' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Security and utility middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path to case studies data
const caseStudiesPath = path.join(__dirname, 'data', 'case_studies.json');

// API Routes
app.get('/api/case-studies', (req, res) => {
  fs.readFile(caseStudiesPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading case studies file:', err);
      return res.status(500).json({ error: 'Failed to read case studies data' });
    }
    try {
      const caseStudies = JSON.parse(data);
      res.json(caseStudies);
    } catch (parseErr) {
      console.error('Error parsing case studies JSON:', parseErr);
      res.status(500).json({ error: 'Failed to parse case studies data' });
    }
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, org, role, interest, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, Email, and Message are required fields' });
  }

  try {
    // Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      org: org || '',
      role: role || '',
      interest: interest || '',
      message
    });

    const savedContact = await newContact.save();

    console.log('--- Contact Form Saved to MongoDB ---');
    console.log(`Document ID: ${savedContact._id}`);
    console.log(`Name: ${savedContact.name}`);
    console.log(`Email: ${savedContact.email}`);
    console.log('-------------------------------------');

    res.json({
      success: true,
      message: 'Thank you for your message! Our team will get back to you shortly.'
    });
  } catch (dbErr) {
    console.error('Error saving contact to MongoDB:', dbErr);
    res.status(500).json({ error: 'Failed to save submission to the database. Please try again later.' });
  }
});

// Root endpoint info
app.get('/', (req, res) => {
  res.json({
    name: 'Infocus Group API',
    status: 'Running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    endpoints: {
      'GET /api/case-studies': 'Retrieve list of case studies',
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
