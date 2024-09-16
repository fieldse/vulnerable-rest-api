// API utility functions

// Validate body contains a list of required parameters
// Throws error if any parameters are not in request body or request parameters
const validateParams = (req, ...requiredParams) => {
  requiredParams.map((key) => {
    if (!req.body.hasOwnProperty(key) && !req.params.hasOwnProperty(key)) {
      throw new Error(`missing required parameter: ${key}`);
    }
  });
};

module.exports = {
  validateParams,
};
