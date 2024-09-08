// Intentionally vulnerable Express.js REST API
import express from 'express';
const app = express();
const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1', router);

app.listen(3000, () => {
  console.log('API started on port 3000');
});
