// Intentionally vulnerable Express.js REST API
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { PORT } from './config.js';
import { logInfo } from './logger.js';
import { logCookies } from './middleware.js';
const app = express();

// Body-parser middleware for JSON requests
app.use(bodyParser.json());

// Cookie parsing
app.use(cookieParser());
app.use(logCookies);

// Logging
app.use(morgan('tiny'));

// Add routes
app.use(routes);

app.listen(PORT, () => {
  logInfo(`API started on ${PORT}`);
});
