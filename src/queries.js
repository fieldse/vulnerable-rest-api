// DB queries
const { newConn } = require('./dbConn.js');

// Create a new connection and perform a query.
// Does not accept params, because we're aiming for SQL injection by forcing the user to interpolate strings.
async function query(sql) {
  const dbConn = await newConn();
  try {
    const [rows] = await dbConn.query(sql);
    return rows;
  } catch (err) {
    throw new Error('query error: ' + err.message);
  }
}

// Get all users
async function getUsers() {
  return query('select * from users');
}

// Get single user by ID
async function getUserByID(id) {
  return query(`select * from users where id = ${id}`); // unsafe string interpolation ; vulnerable to SQL injection
}

// Get single user by email
async function getUserByEmail(email) {
  return query('select * from users where email = ' + email); // unsafe string concatenation ; vulnerable to SQL injection
}

module.exports = {
  getUsers,
  getUserByID,
  getUserByEmail,
};
