const jwt = require('jsonwebtoken');
const { secret } = require('./config'); 
// Middleware function to verify JWT token and check user access
const authenticateUser = (req, res, next) => {
  try {
      //get the jwt token from the headers
      const authToken = req.headers.authorization;
      //verify Jwt token and get the user object by decoding the token and assign the user to the res.locals
      if (!authToken) {
          return res.status(403).json({ error: "Invalid Token." });
      }
      res.locals.user = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
      next();
  } catch (error) {
      if (error instanceof JWTEXPIREDERROR) {
          return res.status(401).json({ error: "Unauthorized. Token Expired." });

      } else if (error instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({ error: "Unauthorized. Invalid Token." });
      }
      return res.status(500).json({ error:'Internal Server Error' });
  }
};

// Authorization logic middleware
const authorizeUser = (roles) => {
  return (req, res, next) => {
      const userRole = res.locals.user.role;
      //if user role is not in the roles array return error
      if (!roles.includes(userRole)) {
          return res.status(403).json({ error:"You are not allowed to view this."});
      }
      next();
  };
};


module.exports = { authenticateUser, authorizeUser }

