// Error handlers
import { logErr } from '../logger.js';

// Handle invalid request.
// Logs error, returns error status code with message.
export const handleErr = (err, req, res, message = '', statusCode = 400) => {
  logErr(`${req.method} ${req.path}`, err);
  return res
    .status(statusCode)
    .json({ success: false, message: message || err.message });
};
