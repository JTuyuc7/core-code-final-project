const express = require('express');
const router = express.Router();
const { validateTokenUser } = require('../controllers/validateTokenController');

// Validate the token
router.get('/:token',
    validateTokenUser
)

module.exports = router;