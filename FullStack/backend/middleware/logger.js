// Request logging middleware
import morgan from 'morgan';

// Custom morgan format
export const requestLogger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    req.user ? `User: ${req.user.id}` : '',
  ].join(' ');
});

// Development logger (detailed)
export const devLogger = morgan('dev');

// Production logger (concise)
export const prodLogger = morgan('combined');

// Custom logger for API requests
export const apiLogger = morgan(':method :url :status :response-time ms - :res[content-length]');
