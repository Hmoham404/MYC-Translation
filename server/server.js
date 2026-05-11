const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow Vercel frontend and localhost
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL || '' // Add Vercel frontend URL in production
].filter(Boolean);

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins 
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/documents', documentRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', environment: process.env.NODE_ENV || 'development' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
    console.log('Available endpoints:');
    console.log(`  POST http://localhost:${PORT}/api/documents/translate`);
    console.log(`  GET  http://localhost:${PORT}/api/health`);
});
