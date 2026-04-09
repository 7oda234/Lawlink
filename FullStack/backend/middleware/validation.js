// Validation middleware using express-validator
import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Common validation rules
export const validationRules = {
  email: {
    isEmail: {
      errorMessage: 'Please provide a valid email',
    },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },
  name: {
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Name must be between 2 and 50 characters',
    },
    trim: true,
  },
  phone: {
    isMobilePhone: {
      errorMessage: 'Please provide a valid phone number',
    },
  },
};
