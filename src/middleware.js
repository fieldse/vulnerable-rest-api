// Some insecure middleware functions

import { isAdmin, isLoggedIn, isCurrentUser } from './auth.js';
import { handleUnauthorized } from './routes/errors.js';
import { DEBUG } from './config.js';
import { logDebug } from './logger.js';

// Log request cookies and headers
export function logHeaders(req, res, next) {
  if (DEBUG) {
    logDebug(
      `${req.method} ${req.path}`,
      'headers:',
      JSON.stringify(req.headers || {})
    );
    logDebug(
      `${req.method} ${req.path}`,
      'cookies:',
      JSON.stringify(req.cookies || {})
    );
  }
  next();
}

// Require user to be logged in.
// This simply checks against the existence of a 'user' cookie
export function checkIsLoggedIn(req, res, next) {
  if (!isLoggedIn(req)) {
    return handleUnauthorized(req, res, 'you must be logged in to do that');
  }
  next();
}

// Require user to have admin role
// This checks insecurely against a 'role' attribute stored in the cookie
export function checkIsAdmin(req, res, next) {
  if (!isAdmin(req)) {
    return handleUnauthorized(req, res, 'requires admin role');
  }
  next();
}

// Require currently logged in user to match userId parameter, or have admin role
// This checks insecurely against a 'role' attribute stored in the cookie
export function checkIsCurrentUserOrAdmin(req, res, next) {
  if (!isCurrentUser(req) || !isAdmin(req)) {
    return handleUnauthorized(req, res, 'requires admin or current user role');
  }
  next();
}
