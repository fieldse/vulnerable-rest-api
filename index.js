// Intentionally vulnerable Express.js REST API
const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config.js');

const { PORT, API_VERSION } = config;

// GET /
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Set base URL to /api/v1
app.use(`/api/${API_VERSION}`, router);

// Debug
const debugParams = {
  PORT,
  API_VERSION,
};
console.log('=== debug: ', JSON.stringify(debugParams, null, 2));
app.listen(PORT, () => {
  console.log(`API started on ${PORT}`);
});
