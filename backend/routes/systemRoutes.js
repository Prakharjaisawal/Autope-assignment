const express = require('express');
const os = require('os');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

router.get('/metrics', (req, res) => {
  res.json({
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuLoad: os.loadavg(),
    platform: os.platform(),
    nodeVersion: process.version,
  });
});

module.exports = router;
