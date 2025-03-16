const nodemailer = require("nodemailer");

const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW,
  },
};

//create transporter
const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  post: emailConfig.port,
  secure: emailConfig.secure,
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass,
  },
});

const sendConfirmEmail = (email, username) => {
  const mailOptions = {
    from: "devvspacce@gmail.com",
    to: email,
    subject: "ยืนยันการลงทะเบียน",
    text: `สวัสดี ${username} \n\n ขอบคุณที่ลงทะเบียนกับเรา! การลงทะเบียนของคุณสำเร็จแล้ว ยินดีต้อนรับเข้าสู่ระบบของเรา \n\n ขอบคุณที่ใช้บริการ`,
  };
  //   console.log("Sending email => ", mailOptions);
  transporter.sendMail(mailOptions);
};

module.exports = {
  sendConfirmEmail,
};
