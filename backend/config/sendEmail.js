import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
} from "../nodemailer/emailTemplate.js";
import { transporter } from "../nodemailer/nodemailerConfig.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );

  const mailOptions = {
    from: `"Souvik ka authentication" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const htmlContent = WELCOME_EMAIL.replace("{user_name}", name);
  const mailOptions = {
    from: `"Souvik ka authentication" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Welcome ${name}`,
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, reseturl) => {
  const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    reseturl
  );
  const mailOptions = {
    from: `"Souvik ka authentication" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const resetSuccessEmail = async (email) => {
  const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;
  const mailOptions = {
    from: `"Souvik ka authentication" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "password Reset Successful",
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending password Reset Successful email: ${error}`);
  }
};
