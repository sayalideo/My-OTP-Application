const SendOtp = require('sendotp');
const sendOtp = new SendOtp('268791AYvSbssoI8jf5c94c5d6');

var rn  = require('random-number')
var gen = rn.generator({
    min:  1000,
    max:  9999,
    integer: true
  });
var otp = gen();
var mob;
var count = 0;

module.exports.getMob = (req,res)=>{
    res
        .status(404)
        .render('main');
}

module.exports.postMob = (req,res)=>{
    mob = req.body.mob;
    sendOtp.send(mob, "PRIIND", otp, function (error, data) {
      console.log(data);
    });
    res.redirect('/verify');
}

sendOtp.setOtpExpiry('2');

module.exports.getOtp = (req,res)=>{
    res.render("verify");
}

module.exports.postMsg = (req,res)=>{
    userOtp = req.body.otp;
    sendOtp.setOtpExpiry('2');

    if(count<=5 ){
        sendOtp.verify(mob, userOtp, function (error, data) {
            console.log(data); // data object with keys 'message' and 'type'
            if(data.type == 'success') {
                console.log('OTP verified successfully');
                res.redirect("/success");
            }
            if(data.type == 'error') {
                count = count + 1;
                console.log("Count : ",count);
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
    else{
        console.log("More than 5 attempts at otp verification");
        res.redirect("/multiple");
    }
    

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

module.exports.multiple = (req,res)=>{
    res.render("multiple");
}