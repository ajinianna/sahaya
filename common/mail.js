var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'sahaya.notification@gmail.com',
        pass: 'eD2ET3WuTNwRaqg'
    }
}));

const sendOTP = (to, otp, callback) => {
    transporter.sendMail({
        from: 'sahaya.notification@gmail.com',
        to: to,
        subject: 'OTP for Sahaya account creation',
        text: 'Enter below OTP ' + otp + ' to continue signup'
    }, callback);
}
module.exports = sendOTP