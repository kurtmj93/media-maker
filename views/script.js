var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'mediamaker804@hotmail.com',
    pass: 'TpI2H4U101!'
  }
});

var mailOptions = {
  from: 'mediamaker804@hotmail.com',
  to: 'clayton.wilkey@yahoo.com',
  subject: 'New Account',
  text: 'Welcome to Media Maker!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});