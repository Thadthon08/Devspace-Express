const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const emailConfig = {
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: true,
  auth: {
    user: "809701002@smtp-brevo.com",
    pass: "xsmtpsib-bf6b3d6bb41423820371740cd969bf09a664630734f4f1919f78427c569a37b3-m7K2k3wzCEZJ95DS",
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

app.get("/api/sendEmail", (req, res) => {
  sendConfirmEmail("devvspacce@gmail.com");
  res.send("Email sent successfully");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
