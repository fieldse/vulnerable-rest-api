// Intentionally vulnerable Express.js REST API
const express = require('express');
const app = express();
const config = require('./config.js');
const api = require('./api.js');
const bodyParser = require('body-parser');

const { PORT, API_BASE_PATH } = config;

// Body-parser middleware for JSON requests
app.use(bodyParser.json());

// Base API path default: /api/v1
app.use(API_BASE_PATH, api);
app.listen(PORT, () => {
  console.log(`API started on ${PORT}`);
});
