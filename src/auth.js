// Some insecure authentication functions

import { logErr } from './logger.js';

// Insecurely check if the user is authenticated.
// This simply checks against the existence of an unsigned authorization token
export function isLoggedIn(req) {
  const token = parseToken(req);
  return !!token; // Insecure: doesn't validate the token
}

// Check if the user is an admin by the authentication token.
// This token is not signed, and so vulnerable to manipulation and forgery.
export function isAdmin(req) {
  const user = parseToken(req);
  return user?.role === 'admin'; // Insecure: simply checks the token for 'role' parameter. which can be modified by the user.
}

// Check if the logged in user's ID matches the userId route parameter
// Required parameters:
//  - userId:  The ID of the target user
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

// Really insecure token validation
export const validateToken = (req, res) => {
  const token = parseToken(req);
  return !!token; // simply checks if the token can be decoded to an object, without any validation.
};

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
