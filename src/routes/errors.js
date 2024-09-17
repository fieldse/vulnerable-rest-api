// Error handlers
import { logErr } from '../logger.js';

// Handle invalid request.
// Logs error, returns error status code with message.
export const handleErr = (err, req, res, message = '', statusCode = 400) => {
  logErr(`${req.method} ${req.path}`, err);
  return res
    .status(statusCode)
    .json({ success: false, message: message || err.message }); // Insecure: including error traces leaks error information. This could include database information, filepaths, or schema details
};

// Handle unauthorized request -- status 401
export const handleUnauthorized = (req, res, message = 'unauthorized') => {
  logErr(`${req.method} ${req.path}`, { message });
  return res.status(401).json({ success: false, message });
};

// Handle resource not found -- status 404
export const handleNotFound = (req, res, message = 'resource not found') => {
  logErr(`${req.method} ${req.path}`, { message });
  return res.status(404).json({ success: false, message });
};
