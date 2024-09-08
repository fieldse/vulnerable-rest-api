// Intentionally vulnerable Express.js REST API
const express = require('express');
const app = express();
const config = require('./config.js');
const api = require('./api.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { logInfo } = require('./logger.js');
const { PORT, API_BASE_PATH } = config;

// Body-parser middleware for JSON requests
app.use(bodyParser.json());

// Cookie parsing
app.use(cookieParser());

// Logging
app.use(morgan('tiny'));

// Base API path default: /api/v1
app.use(API_BASE_PATH, api);
app.listen(PORT, () => {
  logInfo(`API started on ${PORT}`);
});
