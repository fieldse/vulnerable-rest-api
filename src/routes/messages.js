// Message-board related routes

import express from 'express';
import { validateParams } from '../utils.js';
import {
  getMessages,
  addMessage,
  deleteMessage,
  getMessage,
} from '../queries.js';
import { handleErr } from './errors.js';
import { checkIsAdmin, checkIsLoggedIn } from '../middleware.js';
const router = express.Router();

// GET messages index
router.get('/messages', async (req, res) => {
  try {
    const rows = await getMessages();
    res.status(200).json({ success: true, rows });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// GET message item
router.get('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getMessage(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'message not found' });
    }

    res.status(200).json({ success: true, message: result });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// POST messages
// Insecure: this route only checks for logged in
router.post('/messages', checkIsLoggedIn, async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    validateParams(req, 'title', 'content', 'userId');
    const result = await addMessage(title, content, userId);
    const message = `added message -- id: ${result}`;
    res.status(201).json({ success: true, message });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// DELETE messages
router.delete('/messages/:id', checkIsAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    validateParams(req, 'id');
    const result = await deleteMessage(id);
    const message = `deleted ${result.affectedRows} rows`;

    res.status(200).json({ success: true, message });
  } catch (err) {
    handleErr(err, req, res);
  }
});

export default router;
