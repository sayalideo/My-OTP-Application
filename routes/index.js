var express = require("express");
var router  = express.Router();
var otpCtrl = require("../controllers/otp.ctrl");

router
    .route('/')
    .get(otpCtrl.getMob)
    .post(otpCtrl.postMob);

router
    .route('/verify')
    .get(otpCtrl.getOtp)
    .post(otpCtrl.postMsg);

router
    .route('/success')
    .get(otpCtrl.success);

router
    .route('/failure')
    .get(otpCtrl.failure);

module.exports = router;