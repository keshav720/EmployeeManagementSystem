const authorizeUser = (roles) => {
    return (req, res, next) => {
      const userRole = res.locals.user.role;
      console.log("res-----",res,userRole);
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: "You are not allowed to perform this action." });
      }
      next();
    };
  };
  
  module.exports = authorizeUser;
  