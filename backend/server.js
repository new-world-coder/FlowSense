const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const contractRoutes = require('./routes/contractRoutes');
const flowRoutes = require('./routes/flowRoutes');

app.use('/api/contracts', contractRoutes);
app.use('/api/flow', flowRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FlowSense API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FlowSense backend running on port ${PORT}`);
});

