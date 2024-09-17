// Some insecure middleware functions

import { isAdmin, isLoggedIn } from './auth.js';
import { handleUnauthorized } from './routes/errors.js';

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
