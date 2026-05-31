import jwt from "jsonwebtoken";
import pool from "../db/Connection.js";

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
    const userId = decoded.userId ?? decoded.id ?? decoded.user_id;
    req.user = { ...decoded, userId };
    next();
  } catch (error) {
    return res.status(401).json({ 
      ok: false, 
      message: "Invalid or expired token" 
    });
  }
};

export const requireAdminLevel = (requiredLevel) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    if (req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }

    // 🌟 قاموس ترجمة قيم الـ Enum النصية من قاعدة البيانات لمنع الـ NaN نهائياً
    const levelMap = {
      'SuperAdmin': 5,
      'Level 4': 4,
      'Level 3': 3,
      'Level 2': 2,
      'Level 1': 1
    };

    const rawLevel = req.user.authority_level ?? req.user.level ?? req.user.authorityLevel;
    let userLevel = levelMap[rawLevel] ?? parseInt(rawLevel, 10);

    if (isNaN(userLevel)) {
      try {
        const query = `SELECT authority_level FROM admin WHERE user_id = ?`;
        const actingUserId = req.user.userId ?? req.user.user_id ?? req.user.id;
        const [rows] = await pool.promise().query(query, [actingUserId]);
        
        if (rows && rows.length > 0) {
          const dbLevel = rows[0].authority_level;
          userLevel = levelMap[dbLevel] ?? parseInt(dbLevel, 10);
          req.user.authority_level = dbLevel; 
        } else {
          userLevel = 0; 
        }
      } catch (error) {
        console.error('Error fetching admin authority level:', error);
        userLevel = 0;
      }
    }

    if (isNaN(userLevel) || userLevel < requiredLevel) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Requires Level ${requiredLevel} minimum. Your level: ${userLevel || 0}` 
      });
    }

    if (req.method === 'DELETE' || req.method === 'PUT') {
      req.isHierarchicalMutationAllowed = (targetUserLevel) => {
        if (userLevel === 4 && targetUserLevel === 5) return false; 
        return userLevel >= targetUserLevel;
      };
    }

    next();
  };
};

export const verifyToken = authMiddleware;
export const protect = authMiddleware;
