// user related activity- signup,login
var express = require('express');
var router = express.Router();

var connection = require('../common/db')
var mail = require('../common/mail')

router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var userType = req.body.userType;

  const verifyQuery = {
    text: 'SELECT email FROM public.users WHERE email = $1 AND password = $2 AND user_type = $3 AND otp_verified = $4',
    values: [email, password, userType, "true"]
  }

  if (password && email && userType) {
    connection.query(verifyQuery)
      .then(results => {
        if (results.rows.length == 1) {
          setSessionAfterLogin(req, email, userType, res);
        } else {
          res.send('Username and password doesnt match');
        }
        res.end();
      }).catch(next);
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        res.clearCookie('connect.sid')
        return res.redirect('/');
      }
    });
  }
})


router.get('/signup', (req, res, next) => {
  res.render('users/signup', { title: 'Sign Up' });
}).post('/signup', (req, res, next) => {

  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var aadharNumber = req.body.aadharNumber;
  var userType = req.body.userType;
  var password = req.body.password;

  var generatedOTP = Math.floor(Math.random() * (99999 - 10000) + 10000)

  const query = {
    text: 'INSERT INTO public.users(aadhar_number, current_otp, email, password, phone_number, user_type, otp_verified) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    values: [aadharNumber, generatedOTP, email, password, phoneNumber, userType, false]
  }

  connection.query(query)
    .then(result => mail.sendOTP(email, generatedOTP))
    .then(result => {
      req.session.loggedin = false;
      req.session.email = email;
      req.session.userType = userType;
      res.redirect('./otp');
      res.end();
    }).catch(next)
})

router.get('/otp', (req, res, next) => {
  res.render('users/otp', { title: 'OTP verify' });
}).post('/otp', (req, res, next) => {
  var otp = req.body.otp;

  const verifyOTPQuery = {
    text: 'SELECT * FROM users WHERE email = $1 AND current_otp = $2 AND user_type = $3',
    values: [req.session.email, otp, req.session.userType]
  }

  const updateOTPFlag = {
    text: 'UPDATE public.users SET otp_verified=true WHERE email = $1 AND user_type = $2;',
    values: [req.session.email, req.session.userType]
  }

  connection.query(verifyOTPQuery)
    .then(result => {
      if (result.rows.length == 1) {
        connection.query(updateOTPFlag)
          .then(updateResult => setSessionAfterLogin(req, req.session.email, req.session.userType, res))
          .catch(next)
      }
    }).catch(next)
})

router.get('/resetpassword/request', (req, res, next) => {
  res.render('users/resetpassrequest', { title: 'Reset Password' });
}).post('/resetpassword/request', (req, res, next) => {

  var generatdCode = Math.floor(Math.random() * (99999 - 10000) + 10000);

  const update = {
    text: 'UPDATE public.users SET reset_code=$1 WHERE email = $2;',
    values: [generatdCode, req.body.mail]
  };

  connection.query(update)
    .then(r => mail.sendResetPassword(req.body.mail, generatdCode))
    .then(r => {
      req.session.loggedin = false;
      req.session.resetmail = req.body.mail;
      res.redirect('/users/resetpassword/submit');
    }).catch(next);
})

router.get('/resetpassword/submit', (req, res, next) => {
  res.render('users/resetpassword', { title: 'Reset Password Submit' });
}).post('/resetpassword/submit', (req, res, next) => {

  const verifyResetCode = {
    text: 'SELECT * FROM users WHERE email = $1 AND reset_code = $2',
    values: [req.session.resetmail, req.body.resetCode]
  }

  const updatePassword = {
    text: 'UPDATE public.users SET password=$1 WHERE email = $2;',
    values: [req.body.updatedPassword, req.session.resetmail]
  };

  connection.query(verifyResetCode)
    .then(result => {
      if (result.rows.length == 1) {
        connection.query(updatePassword)
        .then(result => mail.successReset(req.session.resetmail))
          .then(result => res.redirect('/'))
          .catch(next);
      } else {
        res.send('Invalid reset code');
        res.end();
      }
    }).catch(next)
})

module.exports = router;

function setSessionAfterLogin(req, email, userType, res) {
  req.session.loggedin = true;
  req.session.email = email;
  req.session.userType = userType;
  res.redirect('/complaints');
}

