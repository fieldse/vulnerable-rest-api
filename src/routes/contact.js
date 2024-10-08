// Contact form related routes

import express from 'express';
import { validateParams } from '../utils.js';
import { handleErr } from './errors.js';
import { addContact, getContacts, deleteContact } from '../queries.js';
import { checkIsAdmin } from '../middleware.js';
const router = express.Router();

// GET Contact
router.get('/contact', async (req, res) => {
  try {
    const rows = await getContacts();
    res.status(200).json({ success: true, rows });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// POST Contact
// Params: email, name, message
// Insecure: this is a public route, allowing content posted by anyone
router.post('/contact', async (req, res) => {
  try {
    validateParams(req, 'email', 'name', 'message');
    const { email, name, message } = req.body; // TODO: Do something with these
    const result = await addContact(name, email, message);
    res
      .status(201)
      .json({ success: true, message: `Contact successful -- id: ${result}` });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// DELETE contact
router.delete('/contact/:id', checkIsAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    validateParams(req, 'id');
    const result = await deleteContact(id);
    res
      .status(200)
      .json({ success: true, message: `deleted ${result.affectedRows} rows` });
  } catch (err) {
    handleErr(err, req, res);
  }
});
export default router;
