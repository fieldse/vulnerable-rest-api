// User-related routes

import express from 'express';
import { validateParams } from '../utils.js';
import { handleErr } from './errors.js';
import { logInfo, logSuccess } from '../logger.js';
import {
  addUser,
  getUsers,
  getUserByID,
  updatePasswordById,
  updatePasswordByEmail,
  updateUser,
  deleteUser,
} from '../queries.js';
import {
  checkIsAdmin,
  checkIsCurrentUserOrAdmin,
  checkIsLoggedIn,
} from '../middleware.js';
const router = express.Router();

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
    const user = await getUserByID(id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    handleErr(err, req, res, err.message, 401);
  }
});

// POST single user - admin required
router.post('/users', checkIsAdmin, async (req, res) => {
  try {
    validateParams(req, 'name', 'email', 'role', 'password');
    const { name, email, role, password } = req.body;
    const result = await addUser(name, email, role, password);
    if (!result) {
      throw new Error('add user failed');
    }
    res.status(200).json({
      success: true,
      message: 'added user',
      user: { id: result, name, email, role },
    });
  } catch (err) {
    handleErr(err, req, res, err.message, 401);
  }
});

// PUT user
// Allows updating a user's name, email, or password all in one request.
router.put('/users/:id', checkIsCurrentUserOrAdmin, async (req, res) => {
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

// UPDATE password -- update password for currenty logged in user by email
// Params:  email, password
router.post('/update-password', checkIsLoggedIn, async (req, res) => {
  try {
    validateParams(req, 'email', 'password');
    const { email, password } = req.body;
    await updatePasswordByEmail(email, password); // Insecure: allows setting the password for any user by email
    res.status(200).json({ success: true, message: 'password updated' });
  } catch (err) {
    handleErr(err, req, res, 'update password failed: ' + err.message);
  }
});

// DELETE single user
router.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    validateParams(req, 'id');
    const result = await deleteUser(id);
    res
      .status(200)
      .json({ success: true, message: `deleted ${result.affectedRows} rows` });
  } catch (err) {
    handleErr(err, req, res, err.message, 401);
  }
});

export default router;
