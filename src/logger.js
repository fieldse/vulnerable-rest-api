// Utility functions for logging

const logInfo = (msg, ...opts) => {
  console.log(`[+] ${msg} `, ...opts);
};

const logDebug = (msg, ...opts) => {
  console.log(`[debug] ${msg} `, ...opts);
};

const logSuccess = (msg, ...opts) => {
  console.log(`[ok] ${msg} `, ...opts);
};

const logErr = (msg, err) => {
  console.log(`[error] ${msg}: `, err?.message);
};

module.exports = {
  logInfo,
  logDebug,
  logSuccess,
  logErr,
};
