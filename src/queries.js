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

// Validate password -- returns boolean based on password match.
async function validatePassword(email, password) {
  const rows = await query(
    `select password from users where email ='${email}'`
  );
  if (!rows) {
    throw new Error(`no user found for email '${email}'`); // insecure: leaking user information
  }
  return rows[0].password === password;
}

// Update Password by ID
async function updatePasswordById(id, newPassword) {
  return await query(
    `update users set password = '${newPassword}' where id = ${id} `
  );
}

// Update Password by email address
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
  return await query('select id, name, email, role from users');
}

// Get single user by ID
async function getUserByID(id) {
  const result = await query(
    `select id, name, email, role from users where id = ${id}` // unsafe string interpolation ; vulnerable to SQL injection
  );
  return result[0];
}

// Get single user by email
async function getUserByEmail(email) {
  const q = `select id, name, email, role from users where email = '${email}'`; // unsafe string interpolation ; vulnerable to SQL injection
  const rows = await query(q);
  return rows[0];
}

// Update user. Returns true if rows matched.
async function updateUser(id, name, email) {
  const result = await query(
    `UPDATE users set name = '${name}', email = '${email}' WHERE id = ${id}` // unsafe string interpolation ; vulnerable to SQL injection
  );
  return !!result.affectedRows;
}

module.exports = {
  getUsers,
  getUserByID,
  getUserByEmail,
  updateUser,
  updatePasswordById,
  updatePasswordByEmail,
  validatePassword,
};
