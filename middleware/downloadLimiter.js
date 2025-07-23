import rateLimit from "express-rate-limit";

const downloadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many download requests, please try again later.",
});

export default downloadLimiter;
