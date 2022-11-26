const express = require('express');
const router = express.Router();
const confirmAccountController = require('../controllers/confirAccountController');

router.get('/:token',
    confirmAccountController.confirmAccount
)

module.exports = router;