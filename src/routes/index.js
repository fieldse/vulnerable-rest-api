// All routes handled here
const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const contact = require('./contact.js');
const messages = require('./messages.js');
const news = require('./news.js');
const users = require('./users.js');
const errRoutes = require('./404.js');
const { API_BASE_PATH } = require('../config.js');

// Register all routers with the base API path
// GET Index
router.get('/', (req, res) => {
  res.send('Welcome to Vulnerable API!');
});

router.use(API_BASE_PATH, auth);
router.use(API_BASE_PATH, contact);
router.use(API_BASE_PATH, news);
router.use(API_BASE_PATH, messages);
router.use(API_BASE_PATH, users);
router.use(API_BASE_PATH, errRoutes); // catch-all error routes

module.exports = router;
