// 404 and error routes
import express from 'express';
const router = express.Router();
import { handleErr } from './errors.js';

// 400
router.get('/400', (req, res) => {
  const err = new Error('Something went wrong.');
  return handleErr(err, req, res, 400);
});

// 401
router.get('/401', (req, res) => {
  const err = new Error('Not authorized.');
  return handleErr(err, req, res, 401);
});

// 404
router.get('/404', (req, res) => {
  const err = new Error('Something went wrong.');
  return handleErr(err, req, res, 404);
});

// Catch-all / unhandled routes
router.all('*', (req, res) => {
  const err = new Error('path not found');
  return handleErr(err, req, res, 404);
});

export default router;
