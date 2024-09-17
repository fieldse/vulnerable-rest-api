// All routes handled here
import express from 'express';
const router = express.Router();
import auth from './auth.js';
import contact from './contact.js';
import messages from './messages.js';
import news from './news.js';
import users from './users.js';
import errRoutes from './404.js';
import { API_BASE_PATH } from '../config.js';

// Register all routers with the base API path
// GET Index
router.get(API_BASE_PATH + '/', (req, res) => {
  res.send('Welcome to Vulnerable API!');
});

router.use(API_BASE_PATH, auth);
router.use(API_BASE_PATH, contact);
router.use(API_BASE_PATH, news);
router.use(API_BASE_PATH, messages);
router.use(API_BASE_PATH, users);
router.use(API_BASE_PATH, errRoutes); // catch-all error routes

export default router;
