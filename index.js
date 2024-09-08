// Intentionally vulnerable Express.js REST API
const express = require('express');
const app = express();
const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Set base URL to /api/v1
app.use('/api/v1', router);

app.listen(3000, () => {
  console.log('API started on port 3000');
});
