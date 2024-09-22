// Intentionally vulnerable Express.js REST API
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.js';
import { PORT } from './config.js';
import { logInfo } from './logger.js';
import { logHeaders } from './middleware.js';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Cookie parsing
app.use(cookieParser());
// app.use(logHeaders);

// Logging
app.use(morgan('tiny'));

// Add routes
app.use(routes);

app.listen(PORT, () => {
  logInfo(`API started on ${PORT}`);
});
