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

module.exports = router;