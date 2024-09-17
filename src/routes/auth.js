// Auth-related routes
import express from 'express';
import { validateParams } from '../utils.js';
import { isAdmin, isLoggedIn } from '../middleware.js';
import { getUserByEmail, validatePassword } from '../queries.js';
import { handleErr } from './errors.js';
const router = express.Router();

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
    let err = new Error('not logged in');
    return handleErr(err, req, res);
  }
  const userIsAdmin = isAdmin(req, res);
  res.status(200).json({ success: true, message: `is admin: ${userIsAdmin}` });
});

export default router;
