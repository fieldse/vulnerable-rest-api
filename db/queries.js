// DB queries
const { newConn } = require('./dbConn.js');

// Get all users
async function getUsers() {
  const dbConn = await newConn();
  try {
    const [results] = await dbConn.query('select * from users');
    return results;
  } catch (err) {
    throw new Error('query error: ' + err.message);
  }
}

module.exports = {
  getUsers,
};
