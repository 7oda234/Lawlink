// Security middleware
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Helmet configuration
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});

// Rate limiting
export const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// API rate limiter
export const apiLimiter = createRateLimiter();

// Auth rate limiter (stricter)
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5);

// General rate limiter for sensitive operations
export const sensitiveLimiter = createRateLimiter(60 * 1000, 10);
