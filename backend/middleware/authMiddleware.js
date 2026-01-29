const jwt = require("jsonwebtoken");
const User = require("../Database/auth");

const JWT_SECRET = process.env.JWT_SECRET || "aabc6a9cfcfc05011de1978688bea7e28a045a9fa2fce2c15038c24a1a26e67f";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {authMiddleware};
