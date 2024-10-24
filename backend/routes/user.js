const express = require('express');
const router = express.Router();
const { otp, verifyOtp, } = require('../controller/user');

// User routes
router.post('/otp', otp);
router.post('/otpverify', verifyOtp);


module.exports = router;
