// API routes
const express = require('express');
const router = express.Router();
const { logErr, logSuccess } = require('./logger.js');

// GET /
router.get('/', (req, res) => {
  logSuccess('POST /');
  res.send('Welcome to Vulnerable API!');
});

// Validate body contains a list of required parameters
// Throws error if
const validateParams = (req, ...requiredParams) => {
  requiredParams.map((key) => {
    if (!req.body.hasOwnProperty(key)) {
      throw new Error(`missing required parameter: ${key}`);
    }
  });
};

// Login
// Required params:
//  email, password
router.post('/login', (req, res) => {
  try {
    validateParams(req, 'email', 'password');
    // Do something with these
    const { email, password } = req.body;
    logSuccess('POST /login', JSON.stringify({ email, password }));

    res.status(200).json({ success: true, message: 'login successful' });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: 'invalid request: ' + err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  logSuccess('POST /logout');
  res.status(200).json({ success: true, message: 'logout successful' });
});

// POST Contact
// Params: email, name, message
router.post('/contact', (req, res) => {
  try {
    validateParams(req, 'email', 'name', 'message');
    // Do something with these
    const { email, name, message } = req.body;
    logSuccess('POST /contact', JSON.stringify({ email, name, message }));
    res.status(200).json({ success: true, message: 'Contact successful' });
  } catch (err) {
    logErr('POST /contact', err);
    res
      .status(400)
      .json({ success: false, message: 'invalid request: ' + err.message });
  }
});

module.exports = router;
