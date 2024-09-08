// Load environment variables

require('dotenv').config();

const API_VERSION = process.env.API_VERSION || 'v1';
const PORT = process.env.PORT || 3000;

module.exports = {
  API_VERSION,
  PORT,
};
