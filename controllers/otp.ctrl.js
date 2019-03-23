var rn      = require('random-number')

const SendOtp = require('sendotp');
//const AuthKey = '268791AYvSbssoI8jf5c94c5d6';

const sendOtp = new SendOtp('268791AYvSbssoI8jf5c94c5d6');

 //otp is optional if not sent it'll be generated automatically
//sendOtp.retry(contactNumber, retryVoice, callback);
//sendOtp.verify(contactNumber, otpToVerify, callback);

module.exports.getMob = (req,res)=>{
    res
        .status(404)
        .render('main');
}

var gen = rn.generator({
    min:  1000,
    max:  9999,
    integer: true
  });
var otp = gen();
var mob;
module.exports.postMob = (req,res)=>{
    mob = req.body.mob;
    sendOtp.send(mob, "PRIIND", otp, function (error, data) {
      console.log(data);
    });
    sendOtp.setOtpExpiry('0.5');
    res.redirect('/verify');
}
sendOtp.setOtpExpiry('2');
module.exports.getOtp = (req,res)=>{
    res.render("verify");
}

module.exports.postMsg = (req,res)=>{
    userOtp = req.body.otp;
    sendOtp.setOtpExpiry('2');
    sendOtp.verify(mob, otp, function (error, data) {
        console.log(data); // data object with keys 'message' and 'type'
        if(data.type == 'success') {
            console.log('OTP verified successfully');
            res.redirect("/success");
        }
        if(data.type == 'error') {
            if(data.message == 'otp_expired'){
                console.log('OTP verification timedout');
                res.redirect("/timeout");
            }else{
                console.log('OTP verification failed');
                res.redirect("/failure");
            }
            
        }
      });

}

module.exports.success = (req,res)=>{
    res.render("success");
}

module.exports.failure = (req,res)=>{
    res.render("failure");
}

module.exports.timeout = (req,res)=>{
    res.render("timeout");
}