import nodeMailer from "nodemailer";

export const sendEmail = async ({ to, subject, message }) => {
    try {
        const transporter = nodeMailer.createTransport ({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html: message,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;

    } catch (error) {
        throw new Error(error.message || "Cannot send email")
    }
};

