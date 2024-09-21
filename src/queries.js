// SQL queries for DB requests

import db from './dbConn.js';

// Create a new connection and perform an unsafe query.
// Does not accept query params, because we're aiming for SQL injection by forcing the user to interpolate strings.
export async function queryUnsafe(sql) {
  const dbConn = await db.newConn();
  try {
    const [result] = await dbConn.query(sql);
    return result;
  } catch (err) {
    throw new Error('query error: ' + err.message);
  }
}

// Create a new connection and perform a somewhat-safe query with query parameters.
// This is for the cases where we'd prefer to avoid SQL injection or accidental escaping.
export async function querySafe(sql, ...params) {
  const dbConn = await db.newConn();
  try {
    const [result] = await dbConn.query(sql, [...params]);
    return result;
  } catch (err) {
    throw new Error('query error: ' + err.message);
  }
}

// Validate password -- returns boolean based on password match.
export async function validatePassword(email, password) {
  const rows = await queryUnsafe(
    `SELECT password FROM users WHERE email ='${email}'`
  );
  if (!rows) {
    throw new Error(`no user found for email '${email}'`); // insecure: leaking user information
  }
  return rows[0].password === password;
}

// Update Password by ID
export async function updatePasswordById(id, newPassword) {
  return await queryUnsafe(
    `UPDATE users SET password = '${newPassword}' where id = ${id} `
  );
}

// Update Password by email address
export async function updatePasswordByEmail(email, newPassword) {
  if (!email || !newPassword) {
    throw new Error('email and password parameters are required');
  }
  return await queryUnsafe(
    `UPDATE users SET password = '${newPassword}' where email = '${email}' `
  );
}

// Get all users
export async function getUsers() {
  return await queryUnsafe('SELECT id, name, email, role FROM users');
}

// Get single user by ID
export async function getUserByID(id) {
  const result = await queryUnsafe(
    `SELECT id, name, email, role FROM users WHERE id = ${id}` // unsafe string interpolation ; vulnerable to SQL injection
  );
  return result[0];
}

// Add user (safe/parameterized). Returns ID on success
export async function addUser(name, email, role, password) {
  const result = await querySafe(
    'INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)',
    name,
    email,
    role,
    password
  );
  return result.insertId;
}
// Get single user by email
export async function getUserByEmail(email) {
  const q = `SELECT id, name, email, role FROM users WHERE email = '${email}'`; // unsafe string interpolation ; vulnerable to SQL injection
  const rows = await queryUnsafe(q);
  return rows[0];
}

// Update user. Returns true if rows matched.
export async function updateUser(id, name, email) {
  const result = await queryUnsafe(
    `UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id}` // unsafe string interpolation ; vulnerable to SQL injection
  );
  return !!result.affectedRows;
}

// Delete user
export async function deleteUser(id) {
  return await querySafe('DELETE FROM users WHERE id = ?', id);
}

// Get all news
export async function getNews() {
  return await queryUnsafe(
    'SELECT n.id, n.title, n.content, u.email, u.name AS user_name FROM news n LEFT JOIN users u ON n.posted_by_id = u.id'
  );
}

// Get news item
export async function getNewsItem(id) {
  const result = await querySafe(
    'SELECT n.id, n.title, n.content, u.email, u.name AS user_name FROM news n LEFT JOIN users u ON n.posted_by_id = u.id WHERE n.id = ?',
    id
  );
  return result[0];
}

// Add news entry. Returns ID on success
export async function addNews(title, content, userId) {
  const result = await querySafe(
    'INSERT INTO news (title, content, posted_by_id) VALUES (?, ?, ?)',
    title,
    content,
    userId
  );
  return result.insertId;
}

// Delete news entry
export async function deleteNews(id) {
  return await querySafe('DELETE FROM news WHERE id = ?', id);
}

// Get all message board entries
export async function getMessages() {
  return await queryUnsafe(
    'SELECT m.id, m.title, m.content, u.email, u.name AS user_name FROM message_board m LEFT JOIN users u ON m.posted_by_id = u.id'
  );
}

// Get single message board item
export async function getMessage(id) {
  const result = await querySafe(
    'SELECT m.id, m.title, m.content, u.email, u.name AS user_name FROM message_board m LEFT JOIN users u ON m.posted_by_id = u.id WHERE m.id = ?',
    id
  );
  return result[0];
}

// Add message board entry. Returns ID on success
export async function addMessage(title, content, userId) {
  const result = await querySafe(
    'INSERT INTO message_board (title, content, posted_by_id) VALUES (?, ?, ?)',
    title,
    content,
    userId
  );
  return result.insertId;
}

// Delete message board entry
export async function deleteMessage(id) {
  return await querySafe('DELETE FROM message_board WHERE id = ?', id);
}

// Get contact form entries
export async function getContacts() {
  return await queryUnsafe(`SELECT * FROM contact`);
}

// Add contact table item (for contact form). Returns ID on success
export async function addContact(name, email, message) {
  const result = await queryUnsafe(
    `INSERT INTO contact (name, email, message) VALUES ( '${name}', '${email}', '${message}')` // dramatically insecure for a contact form
  );
  return result.insertId;
}
// Delete contact entry
export async function deleteContact(id) {
  return await querySafe('DELETE FROM contact WHERE id = ?', id);
}

export default {
  getUsers,
  getUserByID,
  getUserByEmail,
  updateUser,
  deleteUser,
  updatePasswordById,
  updatePasswordByEmail,
  validatePassword,
  getNews,
  getNewsItem,
  addNews,
  deleteNews,
  getMessage,
  getMessages,
  addMessage,
  deleteMessage,
  getContacts,
  addContact,
  deleteContact,
};
