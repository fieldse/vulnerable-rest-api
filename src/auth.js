// Some insecure authentication functions
// Check if the user is logged in (... by existence of a cookie!)
export function isLoggedIn(req) {
  return !!req.cookies?.user; // Insecure: this simply checks if _any_ cookie named 'user' exists, without validation.
}

// Check if the user is an admin (by a cookie attribute!)
export function isAdmin(req) {
  const cookie = req.cookies?.user;
  if (!cookie) return false;
  const role = JSON.parse(cookie).role;
  return role === 'admin'; // Insecure: simply checks the cookie for 'role' parameter. which can be modified by the user.
}

// Check if the logged in user's ID matches the userId route parameter
export function isCurrentUser(req) {
  const userId = req.params.userId;
  const cookie = req.cookies?.user;
  if (!cookie || !userId) return false;
  return userId == cookie.id;
}

// Generate a really insecure token for the user
export function generateToken(user) {
  if (!user) {
    throw new Error('generateToken: user is empty');
  }
  return Buffer.from(JSON.stringify(user)).toString('base64');
}

// Really insecure token validation
// This currently just decodes the token into a user.
export function validateToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('ascii');
    console.log('=== debug: decoded: ' + decoded);
    const parsedUser = JSON.parse(decoded);
    console.log('=== debug: parsedUser.email: ' + parsedUser?.email);
    return parsedUser;
  } catch (err) {
    console.log('decode token failed:', err.message);
    return;
  }
}
