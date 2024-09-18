// News-related routes

import express from 'express';
import { getNews, addNews, deleteNews } from '../queries.js';
import { handleErr } from './errors.js';
import { validateParams } from '../utils.js';
import { checkIsAdmin } from '../middleware.js';
const router = express.Router();

// GET news
router.get('/news', async (req, res) => {
  try {
    const rows = await getNews();
    res.status(200).json({ success: true, rows });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// POST news
router.post('/news', checkIsAdmin, async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    validateParams(req, 'title', 'content', 'userId');
    const result = await addNews(title, content, userId);
    res.status(201).json({ success: true, message: `added -- id: ${result}` });
  } catch (err) {
    handleErr(err, req, res);
  }
});

// DELETE news
router.delete('/news/:id', checkIsAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    validateParams(req, 'id');
    const result = await deleteNews(id);
    res
      .status(200)
      .json({ success: true, message: `deleted ${result.affectedRows} rows` });
  } catch (err) {
    handleErr(err, req, res);
  }
});
export default router;
