import jwt from "jsonwebtoken";

// 🔑 المفتاح السري (يجب أن يكون مطابقاً لملف auth.service.js)
const JWT_SECRET = "lawlink_secret_key"; 

/**
 * ميدلوير التحقق من الهوية (Authentication Middleware)
 */
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
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.log("JWT Verify Error:", error.message); 
    return res.status(401).json({ 
      ok: false, 
      message: "Invalid or expired token" 
    });
  }
};

// 🔄 تصدير إضافي بنفس الاسم القديم لدعم ملفات الـ AI والملفات الأخرى
// This ensures backward compatibility with modules searching for 'verifyToken'
export const verifyToken = authMiddleware;
