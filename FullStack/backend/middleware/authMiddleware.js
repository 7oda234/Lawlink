import jwt from "jsonwebtoken";

const JWT_SECRET = "lawlink_secret_key"; 

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      ok: false, 
      message: "Access denied. No token provided." 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // تأكدنا إننا بنخزن userId عشان الـ Controller يقرأه صح
    req.user = { ...decoded, userId: decoded.userId || decoded.id }; 
    next(); 
  } catch (error) {
    return res.status(401).json({ 
      ok: false, 
      message: "Invalid or expired token" 
    });
  }
};

// 🔄 تصدير الأسماء المختلفة لضمان عمل السيستم بالكامل
export const verifyToken = authMiddleware;
export const protect = authMiddleware; // 👈 ده اللي بيحل الـ SyntaxError