const jwt = require('jsonwebtoken');
const { secret } = require('./config'); 
// Middleware function to verify JWT token and check user access
const authMiddleware = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    // Check user role or permissions
    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
    }
    // Attach user info to request object for further processing
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;
