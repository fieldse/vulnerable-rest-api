// Load environment variables

require('dotenv').config();

const API_VERSION = process.env.API_VERSION || 'v1';
const PORT = process.env.PORT || 3000;
const API_BASE_PATH = `/api/${API_VERSION}`;

module.exports = {
  API_VERSION,
  API_BASE_PATH,
  PORT,
};
