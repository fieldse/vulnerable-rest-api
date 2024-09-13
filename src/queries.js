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

// Uopdate Password by ID
async function updatePasswordById(id, newPassword) {
  return await query(
    `update users set password = '${newPassword}' where id = ${id} `
  );
}

// Uopdate Password by email address
async function updatePasswordByEmail(email, newPassword) {
  if (!email || !newPassword) {
    throw new Error('email and password parameters are required');
  }
  return await query(
    `update users set password = '${newPassword}' where email = '${email}' `
  );
}

// Get all users
async function getUsers() {
  return await query('select * from users');
}

// Get single user by ID
async function getUserByID(id) {
  return await query(`select * from users where id = ${id}`)[0]; // unsafe string interpolation ; vulnerable to SQL injection
}

// Get single user by email
async function getUserByEmail(email) {
  const q = `select * from users where email = '${email}'`; // unsafe string interpolation ; vulnerable to SQL injection
  const rows = await query(q);
  return rows[0];
}

module.exports = {
  getUsers,
  getUserByID,
  getUserByEmail,
  updatePasswordById,
  updatePasswordByEmail,
};
