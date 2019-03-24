# My-OTP-Application
This is a simple OTP Application using NodeJS,Express,EJS.

An OTP is a One Time Password which is used t identify user authenticty. This OTP is sent by the server to the client's phone and the client inputs it back to 
the server. If the values match at the server-side, the client-given contact number is valid and indeed the client's. This is how simple and efficient the working of an OTP is.  

To send OTP,
sendotp,msg91 module of npm is used.

To generate random OTP, random-number module of npm is used.

Although sendotp generates a random otp by default, random-number is used to generate a number in the range of the developer's choice.

On successful verification, the client is redirected to the 'Successful' page.
On unsuccessful verification, the client is redirected to the 'Failed' page.
On timeout, which has been assigned as 2 minutes, the client is redirected to the 'Timeout' page.
On multiple failed attempts at verification, the client is redirected to the 'Multiple' page. Here the maximum number of failed attempts is set to 5.

The application is hosted using Heroku.
It can be viewed on https://my-otp-application.herokuapp.com/



