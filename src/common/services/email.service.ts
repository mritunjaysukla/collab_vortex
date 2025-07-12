import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!apiKey || apiKey === 'your-resend-api-key-here') {
      this.logger.warn('Resend API key not configured. Email functionality will be disabled.');
      this.resend = null;
    } else {
      this.resend = new Resend(apiKey);
    }

    this.fromEmail = this.configService.get<string>('FROM_EMAIL') || 'noreply@collabvortex.com';
    this.fromName = this.configService.get<string>('FROM_NAME') || 'CollabVortex';
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean> {
    if (!this.resend) {
      this.logger.warn('Resend not initialized. Skipping email send.');
      return false;
    }

    const resetUrl = `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/auth/reset-password?token=${resetToken}`;

    try {
      const { data, error } = await this.resend.emails.send({
        from: `${this.fromName} <${this.fromEmail}>`,
        to: [to],
        subject: 'Reset Your CollabVortex Password',
        html: this.getPasswordResetTemplate(resetUrl),
      });

      if (error) {
        this.logger.error('Failed to send password reset email:', error);
        return false;
      }

      this.logger.log(`Password reset email sent to ${to}. ID: ${data?.id}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send password reset email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(to: string, userName: string): Promise<boolean> {
    if (!this.resend) {
      this.logger.warn('Resend not initialized. Skipping email send.');
      return false;
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `${this.fromName} <${this.fromEmail}>`,
        to: [to],
        subject: 'Welcome to CollabVortex!',
        html: this.getWelcomeTemplate(userName),
      });

      if (error) {
        this.logger.error('Failed to send welcome email:', error);
        return false;
      }

      this.logger.log(`Welcome email sent to ${to}. ID: ${data?.id}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send welcome email:', error);
      return false;
    }
  }

  async sendNotificationEmail(to: string, subject: string, message: string): Promise<boolean> {
    if (!this.resend) {
      this.logger.warn('Resend not initialized. Skipping email send.');
      return false;
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `${this.fromName} <${this.fromEmail}>`,
        to: [to],
        subject,
        html: this.getNotificationTemplate(subject, message),
      });

      if (error) {
        this.logger.error('Failed to send notification email:', error);
        return false;
      }

      this.logger.log(`Notification email sent to ${to}. ID: ${data?.id}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send notification email:', error);
      return false;
    }
  }

  async sendPasswordChangedEmail(to: string, userName: string): Promise<boolean> {
    if (!this.resend) {
      this.logger.warn('Resend not initialized. Skipping email send.');
      return false;
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `${this.fromName} <${this.fromEmail}>`,
        to: [to],
        subject: 'Password Changed Successfully',
        html: this.getPasswordChangedTemplate(userName),
      });

      if (error) {
        this.logger.error('Failed to send password changed email:', error);
        return false;
      }

      this.logger.log(`Password changed email sent to ${to}. ID: ${data?.id}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send password changed email:', error);
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
              <a href="${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Get Started</a>
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
              <a href="${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">View Dashboard</a>
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
