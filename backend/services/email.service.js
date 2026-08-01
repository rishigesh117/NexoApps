/**
 * Email Service Blueprint (Nodemailer / SendGrid Ready)
 * NexoApps Platform
 */

const EmailService = {
  sendVerificationEmail: async (toEmail, verificationToken) => {
    console.log(`[EMAIL STUB] Verification email sent to: ${toEmail}`);
    return true;
  },
  sendPasswordReset: async (toEmail, resetToken) => {
    console.log(`[EMAIL STUB] Password reset sent to: ${toEmail}`);
    return true;
  },
};

module.exports = EmailService;
