// Some insecure authentication functions

import { logErr } from './logger.js';

// Insecurely check if the user is authenticated.
export function isLoggedIn(req) {
  const token = parseToken(req);
  return !!token; // Insecure: this simply checks if the token can be decoded to an object, without any validation.
}

// Check if the user is an admin by the authentication token.
// This token is not signed, and so vulnerable to manipulation and forgery.
export function isAdmin(req) {
  const user = parseToken(req);
  return user?.role === 'admin'; // Insecure: simply checks the token for 'role' parameter. which can be modified by the user.
}

// Check if the logged in user's ID matches the userId route parameter
export function isCurrentUser(req) {
  const userId = req.params.userId;
  const user = parseToken(req);
  if (!user || !userId) return false;
  return userId == user.id;
}

// Generate a really insecure token for the user
export function generateToken(user) {
  if (!user) {
    throw new Error('generateToken: user is empty');
  }
  return Buffer.from(JSON.stringify(user)).toString('base64');
}

// Extract and parse token into User object from request headers.
export const parseToken = (req) => {
  try {
    const token = req.headers?.authorization?.replace('Bearer ', '') || '';
    if (!token) {
      return;
    }
    // Decode base64 and parse JSON to object
    const decoded = Buffer.from(token, 'base64').toString('ascii');
    return JSON.parse(decoded);
  } catch (err) {
    logErr('decode token failed', err);
    return;
  }
};
