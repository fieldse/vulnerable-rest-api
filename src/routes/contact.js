// Contact form related routes

import express from 'express';
import { validateParams } from '../utils.js';
import { handleErr } from './errors.js';
const router = express.Router();

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

export default router;
