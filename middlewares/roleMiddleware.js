const verifyRoles = (roles) => {
  if (!Array.isArray(roles)) roles = [roles];
  return (req, res, next) => {
    const user = req.user;
    if (!roles.includes(user?.role)) {
      res.json({
        message: `${roles.join(" ,")} can only perform this action`,
      });
    }
    next();
  };
};

module.exports = verifyRoles;
