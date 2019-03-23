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

module.exports.postMob = (req,res)=>{
    var mob = req.body.mob;
    sendOtp.send(mob, "PRIIND", otp, function (error, data) {
      console.log(data);
    });
    res.redirect('/verify');
}

module.exports.getOtp = (req,res)=>{
    res.render("verify");
}

module.exports.postMsg = (req,res)=>{
    userOtp = req.body.otp;
    if(userOtp == otp){
        res.redirect("/success");
    }else{
        res.redirect("/failure");
    }
}

module.exports.success = (req,res)=>{
    res.render("success");
}

module.exports.failure = (req,res)=>{
    res.render("failure");
}