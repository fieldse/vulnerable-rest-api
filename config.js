// Load environment variables

require('dotenv').config();

const API_VERSION = process.env.API_VERSION || 'v1';
const PORT = process.env.PORT || 3000;
const API_BASE_PATH = `/api/${API_VERSION}`;

// MySQL database config
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'example';

module.exports = {
  API_VERSION,
  API_BASE_PATH,
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
};
