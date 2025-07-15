import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: Transporter;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(private readonly config: ConfigService) {
    /* ------------------------------------------------------------------
       1. "From" defaults (override in .env if you like)
    ------------------------------------------------------------------ */
    this.fromEmail = this.config.get<string>('FROM_EMAIL') ?? 'collabvortex.noreply@gmail.com';
    this.fromName = this.config.get<string>('FROM_NAME') ?? 'CollabVortex';

    /* ------------------------------------------------------------------
       2. Brevo SMTP transporter
    ------------------------------------------------------------------ */
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('EMAIL_HOST', 'smtp.gmail.com'),
      port: this.config.get<number>('EMAIL_PORT', 587),
      secure: false, // STARTTLS on port 587, so keep false
      auth: {
        user: this.config.get<string>('EMAIL_USER'),
        pass: this.config.get<string>('EMAIL_PASS'),
      },
    });

    // Optional: show "connected" once at boot
    this.verifyConnection();
  }

  /* --------------------------------------------------------------------
     Verify transporter once during app bootstrap
  -------------------------------------------------------------------- */
  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      this.logger.log('✅ SMTP connection verified');
    } catch (err) {
      this.logger.error('❌ SMTP connection failed', err);
    }
  }

  /* --------------------------------------------------------------------
     Public methods — unchanged except for log wording
  -------------------------------------------------------------------- */

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean> {
    const resetUrl = `${this.config.get('FRONTEND_URL', 'http://localhost:3000')}/auth/reset-password?token=${resetToken}`;

    return this.sendHtml({
      to,
      subject: 'Reset Your CollabVortex Password',
      html: this.getPasswordResetTemplate(resetUrl),
      logLabel: 'Password reset',
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    return this.sendHtml({
      to,
      subject: 'Welcome to CollabVortex!',
      html: this.getWelcomeTemplate(name),
      logLabel: 'Welcome',
    });
  }

  async sendNotificationEmail(to: string, subject: string, message: string): Promise<boolean> {
    return this.sendHtml({
      to,
      subject,
      html: this.getNotificationTemplate(subject, message),
      logLabel: 'Notification',
    });
  }

  async sendPasswordChangedEmail(to: string, name: string): Promise<boolean> {
    return this.sendHtml({
      to,
      subject: 'Password Changed Successfully',
      html: this.getPasswordChangedTemplate(name),
      logLabel: 'Password‑changed',
    });
  }

  /* --------------------------------------------------------------------
     Helper to DRY up send‑mail code
  -------------------------------------------------------------------- */
  private async sendHtml({
    to,
    subject,
    html,
    logLabel,
  }: {
    to: string;
    subject: string;
    html: string;
    logLabel: string;
  }): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: `"${this.fromName}" <${this.fromEmail}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`${logLabel} email sent to ${to}. Message ID: ${info.messageId}`);
      return true;
    } catch (err) {
      this.logger.error(`Failed to send ${logLabel.toLowerCase()} email`, err);
      return false;
    }
  }

  private getPasswordResetTemplate(resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">CollabVortex</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
            
            <p>You requested to reset your password. Click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p style="color: #666; font-size: 14px;">If you didn't request this password reset, please ignore this email. This link will expire in 1 hour.</p>
            
            <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea; font-size: 14px;">${resetUrl}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>&copy; 2025 CollabVortex. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
  }

  private getWelcomeTemplate(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to CollabVortex</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to CollabVortex!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
            
            <p>Thank you for joining CollabVortex, the premier platform connecting brands with content creators!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">What's Next?</h3>
              <ul style="color: #666;">
                <li>Complete your profile to attract better collaborations</li>
                <li>Browse available campaigns that match your niche</li>
                <li>Connect your social media accounts</li>
                <li>Start building amazing partnerships!</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${this.config.get('FRONTEND_URL', 'http://localhost:3000')}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Get Started</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>&copy; 2025 CollabVortex. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
  }

  private getNotificationTemplate(subject: string, message: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">CollabVortex</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">${subject}</h2>
            <p>${message}</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${this.config.get('FRONTEND_URL', 'http://localhost:3000')}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">View Dashboard</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>&copy; 2025 CollabVortex. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
  }

  private getPasswordChangedTemplate(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Changed</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">CollabVortex</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Password Changed Successfully</h2>
            
            <p>Hi ${userName},</p>
            <p>Your CollabVortex account password has been successfully changed.</p>
            <p>If you didn't make this change, please contact our support team immediately.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000/auth/login" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Sign In</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>&copy; 2025 CollabVortex. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
  }
}
