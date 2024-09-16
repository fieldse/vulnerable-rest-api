// Contact form related routes

const express = require('express');
const router = express.Router();
const { validateParams } = require('../utils.js');
const { handleErr } = require('../errors.js');

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

module.exports = router;
