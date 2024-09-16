// Error handlers
import { logErr } from './logger';

// Handle invalid request.
// Logs error, returns error status code with message.
const handleErr = (
  err,
  req,
  res,
  message = 'invalid request',
  statusCode = 400
) => {
  logErr(`${req.method} ${req.path}`, err);
  return res
    .status(statusCode)
    .json({ success: false, message: message || err.message });
};

module.exports = {
  handleErr,
};
