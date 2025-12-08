const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const requestIp = require('request-ip');

// Routes
const locateRoutes = require('./routes/v1/locate');
const statusRoutes = require('./routes/v1/status');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration with allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(requestIp.mw());

// Request logging with IP
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - IP: ${req.clientIp}`);
  next();
});

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/v1/locate', locateRoutes);
app.use('/api/v1/status', statusRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Border Safety Risk Checker API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      locate: 'POST /api/v1/locate',
      status: 'GET /api/v1/status'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🛡️  Border Safety API running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Locate API: POST http://localhost:${PORT}/api/v1/locate`);
});

module.exports = app;
