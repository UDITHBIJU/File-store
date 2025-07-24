import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const sendOtpEmail = async (email: string, otp: string) => {
	const msg = {
		to: email,
		from: process.env.SENDER_EMAIL || "",
		subject: "Your OTP Code",
		html: `<p>Your OTP code is <strong>${otp}</strong>.</p>`,
	};
	await sgMail.send(msg);
};
