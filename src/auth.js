// Some insecure authentication functions
// Check if the user is logged in (... by existence of a cookie!)
export function isLoggedIn(req) {
  return !!req.cookies?.user; // This simply checks if _any_ cookie named 'user' exists
}

// Check if the user is an admin (by a cookie attribute!)
export function isAdmin(req) {
  const cookie = req.cookies?.user;
  if (!cookie) return false;
  const role = JSON.parse(cookie).role;
  return role === 'admin'; // Insecure: simply checks the cookie for 'role' parameter
}