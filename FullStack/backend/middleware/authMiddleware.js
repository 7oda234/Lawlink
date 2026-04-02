import jwt from "jsonwebtoken";

// 👈 لازم الكلمة دي تكون مطابقة للي في ملف الـ User Controller (وقت اللوجين)
const JWT_SECRET = "lawlink_secret_key"; 

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, message: "Access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // هنا بنفك التوكن بالمفتاح
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // 💡 ضيف السطر ده عشان تشوف المشكلة في الـ Terminal عندك
    console.log("JWT Verify Error:", error.message); 
    
    return res.status(401).json({ 
      ok: false, 
      message: "Invalid or expired token" 
    });
  }
};