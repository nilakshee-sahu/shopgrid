const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
        console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
        console.log("Sending email to:", to);

        await transporter.verify();

        console.log("SMTP connection successful");

        const info = await transporter.sendMail({
            from: `"ShopGrid" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });

        console.log("Email sent successfully:", info.messageId);

        return info;
    } catch (error) {
        console.error("EMAIL ERROR:", error);
        throw error;
    }
};

module.exports = sendEmail;