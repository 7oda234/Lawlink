// Error handling middleware
export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    return res.status(404).json({
      success: false,
      message,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};
