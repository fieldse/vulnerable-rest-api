// API routes
const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.send('Welcome to Vulnerable API!');
});

// Login
router.post('/login', (req, res) => {
  res.status(200).json({ success: true, message: 'login successful' });
});

// Logout
router.post('/logout', (req, res) => {
  res.status(200).json({ success: true, message: 'logout successful' });
});

// POST Contact
// Params: email, name, message
router.post('/contact', (req, res) => {
  try {
    console.log('=== debug: /contact', JSON.stringify(req.body));
    const { email, name, message } = req.body;
    if (!email || !name || !message) {
      throw new Error('required paraameters: name, email, message');
    }
    res.status(200).json({ success: true, message: 'Contact successful' });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: 'invalid request: ' + err.message });
  }
});

module.exports = router;
