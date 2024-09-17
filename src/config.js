// Load environment variables

// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

export const API_VERSION = process.env.API_VERSION || 'v1';
export const PORT = process.env.PORT || 3000;
export const API_BASE_PATH = `/api/${API_VERSION}`;

// MySQL database config
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'example';

export default {
  API_VERSION,
  API_BASE_PATH,
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
};
