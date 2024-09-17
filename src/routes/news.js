// News-related routes

import express from 'express';
import { getNews, addNews, deleteNews } from '../queries.js';
const router = express.Router();

// GET news
router.get('/news', (req, res) => {});

// POST news
router.post('/news', (req, res) => {});

// DELETE news
router.delete('/news', (req, res) => {});

export default router;
