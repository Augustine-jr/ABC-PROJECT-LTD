import rateLimit from 'express-rate-limit';

// Rate limit for newsletter subscriptions
export const newsletterRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 subscription attempts per windowMs
  message: {
    message: 'Too many subscription attempts. Please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => req.ip || req.socket.remoteAddress || 'unknown', // Fallback if IP is undefined
});