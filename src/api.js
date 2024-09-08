// API routes
const express = require('express');
const router = express.Router();
const { logErr } = require('./logger.js');
const { getUsers, getUserByID, getUserByEmail } = require('./queries.js');
const { isAdmin, isLoggedIn } = require('./auth.js');

// GET Index
router.get('/', (req, res) => {
  res.send('Welcome to Vulnerable API!');
});

// GET /users
router.get('/users', async (req, res) => {
  try {
    const rows = await getUsers();
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
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'user not found' }); // insecure: allows account enumeration (however, we have a GET /users route already)
    }
    if (password !== user.password) {
      return res
        .status(401)
        .json({ success: false, message: 'invalid password' }); // insecure: allows account enumeration, by revealing user exists but invalid password.
    }

    // Valid login -- set cookie
    const cookie = JSON.stringify({
      id: user.id, // insecure: we directly set these in a cookie and use it later for authorization
      email: user.email,
      role: user.role,
    });
    res.cookie('user', cookie);
    res.status(200).json({ success: true, message: 'login successful' });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: 'invalid request: ' + err.message });
  }
});

// POST Logout
router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).json({ success: true, message: 'logout successful' });
});

// Get Is Admin?
router.get('/is-admin', (req, res) => {
  if (!isLoggedIn(req, res)) {
    return res.status(401).json({ success: false, message: 'not logged in' });
  }
  const userIsAdmin = isAdmin(req, res);
  res.status(200).json({ success: true, message: `is admin: ${userIsAdmin}` });
});

// POST Contact
// Params: email, name, message
router.post('/contact', (req, res) => {
  try {
    validateParams(req, 'email', 'name', 'message');
    // Do something with these
    const { email, name, message } = req.body;
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
