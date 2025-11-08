import jwt from "jsonwebtoken";
const JWT_SECRET = "yourSecretKey";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = user; // decoded {id, email, isAdmin}
    next();
  });
};
