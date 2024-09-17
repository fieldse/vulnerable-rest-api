// Intentionally vulnerable Express.js REST API
const express = require('express');
const app = express();
const config = require('./config.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.js');

const { logInfo } = require('./logger.js');
const { PORT } = config;

// Body-parser middleware for JSON requests
app.use(bodyParser.json());

// Cookie parsing
app.use(cookieParser());

// Logging
app.use(morgan('tiny'));

// Add routes
app.use(routes);

app.listen(PORT, () => {
  logInfo(`API started on ${PORT}`);
});
