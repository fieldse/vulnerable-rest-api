// Load environment variables

require('dotenv').config();

const API_VERSION = process.env.API_VERSION || 'v1';
const API_HOST = process.env.API_HOST || 'locahost';
const API_PORT = process.env.API_PORT || 3000;

// Full API url - eg: http://localhost:3000
const API_URI = `${API_HOST}:${API_PORT}`;

module.exports = {
  API_VERSION,
  API_HOST,
  API_PORT,
  API_URI,
};
