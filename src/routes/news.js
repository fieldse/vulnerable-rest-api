// News-related routes

const express = require('express');
const router = express.Router();
const { getNews, addNews, deleteNews } = require('../queries.js');

// GET news
router.get('/news', (req, res) => {});

// POST news
router.post('/news', (req, res) => {});

// DELETE news
router.delete('/news', (req, res) => {});

module.exports = router;
