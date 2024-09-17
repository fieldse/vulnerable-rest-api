// Message-board related routes

import express from 'express';
import { validateParams } from '../utils.js';
import { getMessages, addMessage, deleteMessage } from '../queries.js';
const router = express.Router();

// GET messages
router.get('/messages', (req, res) => {});

// POST messages
router.post('/messages', (req, res) => {});

// DELETE messages
router.delete('/messages', (req, res) => {});

export default router;
