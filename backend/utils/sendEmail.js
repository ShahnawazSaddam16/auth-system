const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER || "shahnawazsaddamb@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "joce gxoo kivx uzpo";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, name, verifyUrl) => {
  const mailOptions = {
    from: `"Auth App" <${EMAIL_USER}>`,
    to,
    subject: "Verify Your Account",
    html: `
      <h2>Hello ${name}</h2>
      <p>Please verify your account:</p>
      <a href="${verifyUrl}" style="
        display:inline-block;
        padding:10px 20px;
        background:#2ecc71;
        color:#000;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
      ">Verify Account</a>
      <p>This link expires in 24 hours.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
