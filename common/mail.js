//  sending Email
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
        text: 'Enter below OTP <br>' + otp + '<br> to continue signup'
    }, callback);
}

const sendResetPassword = (to, otp, callback) => {
    transporter.sendMail({
        from: 'sahaya.notification@gmail.com',
        to: to,
        subject: 'Reset password for Sahaya.',
        text: `Enter below code in the webpage to reset the password <br><br> <h1>` + otp + `</h1>`
    }, callback);
}

const successReset = (to,  callback) => {
    transporter.sendMail({
        from: 'sahaya.notification@gmail.com',
        to: to,
        subject: 'Password Reset successfull.',
        text: `Successfully reset your Sahaya password. Please login again with updated password.`
    }, callback);
}

module.exports = {
    sendOTP, sendResetPassword, successReset
}