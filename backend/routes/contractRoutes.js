const express = require('express');
const router = express.Router();
const { generateContract, explainContract } = require('../controllers/contractController');

// POST /api/contracts/generate
router.post('/generate', generateContract);

// POST /api/contracts/explain
router.post('/explain', explainContract);

module.exports = router;

