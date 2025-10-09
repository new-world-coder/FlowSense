const express = require('express');
const router = express.Router();
const { generateContract } = require('../controllers/contractController');

// POST /api/contracts/generate
router.post('/generate', generateContract);

module.exports = router;

