// Intentionally vulnerable Express.js REST API
const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config.js');

const { API_URI, API_VERSION } = config;

// GET /
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Set base URL to /api/v1
app.use(`/api/${API_VERSION}`, router);

app.listen(API_URI, () => {
  console.log(`API started on ${API_URI}`);
});
