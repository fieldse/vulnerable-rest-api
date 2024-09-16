// Message-board related routes

const express = require('express');
const router = express.Router();
const { validateParams } = require('../utils.js');
const { getMessages, addMessage, deleteMessage } = require('../queries.js');

// GET messages
router.get('/messages', (req, res) => {});

// POST messages
router.post('/messages', (req, res) => {});

// DELETE messages
router.delete('/messages', (req, res) => {});

module.exports = router;
