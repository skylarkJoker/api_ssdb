var userRoles = (role = {
  clead: 1,
  chlead: 2,
  admin: 4
});

module.exports.accessLevel = {
  clead: userRoles.clead | userRoles.chlead | userRoles.admin,
  chlead: userRoles.chlead | userRoles.admin,
  admin: userRoles.admin
};

module.exports.levelCheck = level => {
  return (req, res, next) => {
    if (level & req.session.level) {
      // if (level & 4) {
      next();
    } else {
      res.status(403).send("User level is insufficient to preform this action");
    }
  };
};

module.exports.sessionChecker = (req, res, next) => {
  if (req.session.member_id && req.cookies.blitz) {
    next();
  } else {
    res.send("Please login");
  }
};
