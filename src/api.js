// API routes
const express = require('express');
const router = express.Router();
const { logErr, logSuccess, logDebug } = require('./logger.js');
const { getUsers, getUserByID } = require('./queries.js');

// GET Index
router.get('/', (req, res) => {
  logSuccess('POST /');
  res.send('Welcome to Vulnerable API!');
});

// GET /users
router.get('/users', async (req, res) => {
  try {
    const rows = await getUsers();
    logDebug('query results: ', rows);
    logSuccess('GET /users');
    res.status(200).json({
      success: true,
      rows,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// GET /users/:id
router.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    validateParams(req, 'id');
    const rows = await getUserByID(id);
    logSuccess(`GET /users/${id}`, rows);
    res.status(200).json({ success: true, rows });
  } catch (err) {
    logErr('GET /users/:id', err);
    res.status(401).json({ success: false, error: err.message });
  }
});

// POST Login
// Params:  email, password
router.post('/login', async (req, res) => {
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

// POST Logout
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

// Validate body contains a list of required parameters
// Throws error if any parameters are not in request body or request parameters
const validateParams = (req, ...requiredParams) => {
  requiredParams.map((key) => {
    if (!req.body.hasOwnProperty(key) && !req.params.hasOwnProperty(key)) {
      throw new Error(`missing required parameter: ${key}`);
    }
  });
};

module.exports = router;
