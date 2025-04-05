// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} →`, err.message);
  
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
  };
  
  module.exports = errorHandler;
  