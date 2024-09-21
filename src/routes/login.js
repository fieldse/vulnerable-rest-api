// Auth-related routes
import express from 'express';
import { validateParams } from '../utils.js';
import { getUserByEmail, validatePassword } from '../queries.js';
import { handleErr } from './errors.js';
import { generateToken, validateToken } from '../auth.js';
import { logDebug } from '../logger.js';
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

    // Generate a token
    const authToken = generateToken(user);

    // Valid login -- return user details
    res.cookie('user', JSON.stringify(user)); // Setting cookie here for using API headlessly with Postman
    res.status(200).json({
      success: true,
      message: 'login successful',
      user,
      token: authToken,
    });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// POST Logout
router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).json({ success: true, message: 'logout successful' });
});

// Validate login token
router.get('/validate-token', async (req, res) => {
  var message;
  var user;
  var isValid = false;
  try {
    const token = req.headers?.authorization?.replace('Bearer ', '') || '';
    if (!token) {
      message = 'no token';
    } else {
      logDebug(`authToken: ${token}`);
      user = validateToken(token);
      isValid = !!user;
      message = isValid ? 'token is valid' : 'invalid token';
    }
    res.status(200).json({ message, user, isValid });
  } catch (err) {
    handleErr(err, req, res);
  }
});

export default router;
