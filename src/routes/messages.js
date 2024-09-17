// Message-board related routes

import express from 'express';
import { validateParams } from '../utils.js';
import { getMessages, addMessage, deleteMessage } from '../queries.js';
import { handleErr } from './errors.js';
const router = express.Router();

// GET messages
router.get('/messages', async (req, res) => {
  try {
    const data = await getMessages();
    res.status(200).json({ success: true, data });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// POST messages
router.post('/messages', async (req, res) => {
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
router.delete('/messages/:id', async (req, res) => {
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
