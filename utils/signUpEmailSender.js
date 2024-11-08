const nodemailer = require("nodemailer");

const signUpEmailSender = async (name, email, password, cb) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "caresee.bd@gmail.com",
      pass: "fjqdbtaqtpctxqhb", //Usually email senders app password will be inserted here, I am removing mine for my security purpose.
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  let subject = "Your Account Information";
  let text = "WellCome Our CareSee Family";
  let html = `<div>
  <h3>Your Account information</h3>
  <p>Name: <b>${name}</b></p>
  <p>Email: <b>${email}</b></p>
  <p>Password: <b>${password}</b></p>
  <p>Website: <b>http://careseebd.com/login</b></p>

  </div>`;

  let mailOptions = {
    from: "caresee.bd@gmail.com", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
    text: text, // plain text body
  };
  try {
    let sent = await transporter.sendMail(mailOptions, (err, info) => {
      if (info) {
        // console.log("Mail has been sent:", info);
      }
      if (err) {
        console.log(err);
        cb("error-" + err.message);
      } else {
        //   console.log(info);
        cb("sent");
      }
    });
  } catch (error) {
    console.log(error);
    cb("error-" + JSON.stringify(error));
  }
};

module.exports = signUpEmailSender;
