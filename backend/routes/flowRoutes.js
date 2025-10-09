const express = require('express');
const router = express.Router();
const { deployContract, getAccountInfo } = require('../controllers/flowController');

// POST /api/flow/deploy
router.post('/deploy', deployContract);

// GET /api/flow/account/:address
router.get('/account/:address', getAccountInfo);

module.exports = router;

