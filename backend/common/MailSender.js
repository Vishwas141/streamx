const nodemailer = require("nodemailer");
require("dotenv").config();

const MailSender = async (email, event) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER, // Your Gmail email address
                pass: process.env.MAIL_PASS, // Use your generated App Password
            }
        });

        console.log("event", event);

        const posterName = event.eventName;
        const posterImage = event.posterImage; // Assuming you have a URL for the image
        const eventDescription = event.eventDescription;
        const registrationLink = event.registrationLink;

        let info = await transporter.sendMail({
            from: "teamsait2023@gmail.com", // Replace with your Gmail email address
            to: email,
            subject: `Join Us for an Exciting Event: ${posterName}!`,
            html: `
                <h2 style="color: #0070f3; font-size: 24px;">${posterName}</h2>
                <img src="${posterImage}" alt="Poster Image" style="border: 2px solid #0070f3; max-width: 100%;"/>
                <p>We cordially invite you to an extraordinary event that promises excitement, inspiration, and unforgettable moments.</p>
                <p>Get ready to be captivated by:</p>
                <ul>
                    <li>${eventDescription}</li>
                </ul>
                <p style="font-style: italic; font-weight: bold;">Don't miss this opportunity to be part of something remarkable. We look forward to having you join us!</p>
                <p>For more event details and to secure your spot, click the link below:</p>
                <p><a href="${registrationLink}" style="color: #0070f3; text-decoration: none; font-weight: bold;">Register Now</a></p>
            `,
        });

        console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = MailSender;
