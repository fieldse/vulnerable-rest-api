// User-related routes

const express = require('express');
const router = express.Router();
const { validateParams } = require('../utils.js');
const { handleErr } = require('./errors.js');
const { logInfo, logSuccess } = require('./logger.js');
const {
  getUsers,
  getUserByID,
  updatePasswordById,
  updatePasswordByEmail,
  updateUser,
} = require('../queries.js');

// GET all users
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

// GET single user
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

// PUT user
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

module.exports = router;
