// API routes
const express = require('express');
const router = express.Router();
const { logErr, logInfo, logSuccess } = require('./logger.js');
const {
  getUsers,
  getUserByID,
  getUserByEmail,
  validatePassword,
  updatePasswordById,
  updatePasswordByEmail,
  updateUser,
} = require('./queries.js');
const { isAdmin, isLoggedIn } = require('./auth.js');
const { validateParams } = require('./utils.js');

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
    handleErr(err, req, res);
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
    handleErr(err, req, res, err.message, 401);
  }
});

// PUT /users/:id
// Allows updating a user's name, email, or password all in one request.
router.put('/users/:id', async (req, res) => {
  try {
    validateParams(req, 'id', 'name', 'email');
    const { id } = req.params;
    const { name, email, password } = req.body; // Insecure: No validation for logged-in user role, nor matching ID to target user ID.

    // update password if given
    if (!!password) {
      logInfo(`update password for user '${email}'`);
      await updatePasswordById(id, password);
    }
    const ok = await updateUser(id, name, email);
    if (!ok) {
      let err = new Error(`no user found for id ${id}`);
      handleErr(err, req, res, err.message, 404);
    }
    const user = { id, name, email };
    logSuccess('updated user details:', JSON.stringify(user));
    res.status(200).json({ success: true, user });
  } catch (err) {
    handleErr(err, req, res);
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
    const passwordValid = await validatePassword(email, password);
    if (!passwordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'invalid password' }); // insecure: allows account enumeration, by revealing user exists but invalid password.
    }

    // Valid login -- set cookie
    const cookie = JSON.stringify(user);
    res.cookie('user', cookie);
    res.status(200).json({ success: true, message: 'login successful', user });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// POST Logout
router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).json({ success: true, message: 'logout successful' });
});

// GET is-logged-in
router.get('/is-logged-in', (req, res) => {
  const message = isLoggedIn(req, res) ? 'logged in' : 'not logged in';
  res.status(200).json({ success: true, message });
});

// GET is-admin
// Check if the currently logged in user is an admin
router.get('/is-admin', (req, res) => {
  if (!isLoggedIn(req, res)) {
    return handleErr(err, req, res, 'not logged in', 401);
  }
  const userIsAdmin = isAdmin(req, res);
  res.status(200).json({ success: true, message: `is admin: ${userIsAdmin}` });
});

// UPDATE password -- update password for a single user by email
// Params:  email, password
router.post('/update-password', async (req, res) => {
  try {
    validateParams(req, 'email', 'password');
    const { email, password } = req.body;
    await updatePasswordByEmail(email, password);
    res.status(200).json({ success: true, message: 'password updated' });
  } catch (err) {
    handleErr(err, req, res, 'update password failed: ' + err.message);
  }
});

// POST Contact
// Params: email, name, message
router.post('/contact', (req, res) => {
  try {
    validateParams(req, 'email', 'name', 'message');
    const { email, name, message } = req.body; // TODO: Do something with these
    res.status(200).json({ success: true, message: 'Contact successful' });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// GET news

// Catch-all / unhandled routes
router.all('*', (req, res) => {
  const err = new Error('path not found');
  return handleErr(err, req, res, 404);
});

// Handle invalid request.
// Logs error, returns error status code with message.
const handleErr = (
  err,
  req,
  res,
  message = 'invalid request',
  statusCode = 400
) => {
  logErr(`${req.method} ${req.path}`, err);
  return res
    .status(statusCode)
    .json({ success: false, message: message || err.message });
};

module.exports = router;
