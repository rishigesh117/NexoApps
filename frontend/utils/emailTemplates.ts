/**
 * Reusable HTML & Text Email Templates Blueprint
 * NexoApps Platform Security & Verification System
 */

export interface EmailTemplatePayload {
  recipientName: string;
  recipientEmail: string;
  actionUrl?: string;
  deviceInfo?: string;
  ipAddress?: string;
  timestamp?: string;
}

export const EmailTemplates = {
  // 1. Email Verification Template
  verificationEmail: (payload: EmailTemplatePayload) => ({
    subject: 'Verify your NexoApps Email Address',
    text: `Hello ${payload.recipientName},\n\nPlease verify your email address for NexoApps by visiting the following link:\n${payload.actionUrl}\n\nIf you did not create an account, please ignore this email.`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d1117; color: #f0f6fc; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #38bdf8; margin: 0;">NexoApps Platform</h2>
          <p style="color: #8b949e; font-size: 14px;">Email Verification Request</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 24px;">
          <h3 style="margin-top: 0;">Welcome, ${payload.recipientName}!</h3>
          <p style="color: #c9d1d9; font-size: 14px; line-height: 1.6;">
            Thank you for registering on NexoApps. Please click the button below to verify your email address and unlock all platform features.
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${payload.actionUrl}" style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #8b949e; font-size: 12px;">Link expires in 24 hours.</p>
        </div>
        <p style="color: #8b949e; font-size: 12px; text-align: center;">© NexoApps Platform. All rights reserved.</p>
      </div>
    `,
  }),

  // 2. Password Reset Template
  passwordResetEmail: (payload: EmailTemplatePayload) => ({
    subject: 'Reset your NexoApps Password',
    text: `Hello ${payload.recipientName},\n\nYou requested a password reset for your NexoApps account. Visit this link to set a new password:\n${payload.actionUrl}`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d1117; color: #f0f6fc; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #38bdf8; margin: 0;">NexoApps Security</h2>
          <p style="color: #8b949e; font-size: 14px;">Password Reset Request</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 24px;">
          <h3 style="margin-top: 0;">Password Reset Instructions</h3>
          <p style="color: #c9d1d9; font-size: 14px; line-height: 1.6;">
            We received a request to reset your password. Click below to choose a new password:
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${payload.actionUrl}" style="background: linear-gradient(135deg, #a855f7, #7e22ce); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; display: inline-block;">
              Set New Password
            </a>
          </div>
        </div>
      </div>
    `,
  }),

  // 3. Welcome Email Template
  welcomeEmail: (payload: EmailTemplatePayload) => ({
    subject: 'Welcome to NexoApps!',
    text: `Welcome to NexoApps, ${payload.recipientName}! Explore high quality Android APKs and app reviews.`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d1117; color: #f0f6fc; padding: 32px; border-radius: 16px;">
        <h2 style="color: #38bdf8;">Welcome to NexoApps!</h2>
        <p style="color: #c9d1d9;">Your personal app store platform is ready. Explore features and download curated applications.</p>
      </div>
    `,
  }),

  // 4. Security Alert Email Template (New Device Login)
  securityAlertEmail: (payload: EmailTemplatePayload) => ({
    subject: 'Security Alert: New Login to your NexoApps Account',
    text: `Security Alert: Your NexoApps account was accessed from ${payload.deviceInfo || 'a new device'} (IP: ${payload.ipAddress || 'Unknown'}).`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d1117; color: #f0f6fc; padding: 32px; border-radius: 16px; border: 1px solid rgba(239,68,68,0.3);">
        <h2 style="color: #f87171;">Security Alert: New Sign In</h2>
        <p style="color: #c9d1d9;">Your account was accessed from <strong>${payload.deviceInfo || 'a new browser'}</strong> on ${payload.timestamp || new Date().toLocaleString()}.</p>
        <p style="color: #8b949e; font-size: 12px;">If this was not you, please change your password immediately.</p>
      </div>
    `,
  }),
};
