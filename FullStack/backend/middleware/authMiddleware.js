import jwt from "jsonwebtoken";

const JWT_SECRET = "lawlink_secret_key";

export const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: "Access denied"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch {

    return res.status(401).json({
      ok: false,
      message: "Invalid token"
    });

  }
};
