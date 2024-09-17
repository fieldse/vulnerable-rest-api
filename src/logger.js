// Utility functions for logging

export const logInfo = (msg, ...opts) => {
  console.log(`[+] ${msg} `, ...opts);
};

export const logDebug = (msg, ...opts) => {
  console.log(`[debug] ${msg} `, ...opts);
};

export const logSuccess = (msg, ...opts) => {
  console.log(`[ok] ${msg} `, ...opts);
};

export const logErr = (msg, err) => {
  console.log(`[error] ${msg}: `, err?.message);
};

export default {
  logInfo,
  logDebug,
  logSuccess,
  logErr,
};
