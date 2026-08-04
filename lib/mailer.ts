import nodemailer from "nodemailer";

// Uses a Gmail App Password, NOT your normal Gmail password.
// Create one at https://myaccount.google.com/apppasswords
// (requires 2-Step Verification to be enabled on the Google account first).
export const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

export async function sendOtpEmail(to: string, code: string, purpose: "REGISTER_VERIFY" | "LOGIN") {
  const subject = purpose === "REGISTER_VERIFY" ? "Verify your Ridgepath account" : "Your Ridgepath login code";

  await mailer.sendMail({
    from: `"Ridgepath" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 420px; margin: auto;">
        <h2 style="color:#2563EB;">Ridgepath</h2>
        <p>Your one-time code is:</p>
        <p style="font-size: 32px; font-weight: 700; letter-spacing: 6px;">${code}</p>
        <p style="color:#64748b; font-size: 13px;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });
}
