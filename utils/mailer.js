const nodeMailer = require("nodemailer");

class Mailer {
  static async sendEmail({ email, subject, message }) {
    console.log(email,"<-----email")
    const transporter = nodeMailer.createTransport({
      // service: "gmail",
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true, // Output debugging information to the console
      logger: true, // Log SMTP communication
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Mailer;
