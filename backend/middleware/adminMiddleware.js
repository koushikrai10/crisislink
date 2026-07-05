const adminMiddleware = (req, res, next) => {
  // Check if logged-in user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied. Admins Only."
    });
  }

  next();
};

module.exports = adminMiddleware;