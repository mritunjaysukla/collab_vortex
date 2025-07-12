"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        const apiKey = this.configService.get('RESEND_API_KEY');
        if (!apiKey || apiKey === 'your-resend-api-key-here') {
            this.logger.warn('Resend API key not configured. Email functionality will be disabled.');
            this.resend = null;
        }
        else {
            this.resend = new resend_1.Resend(apiKey);
        }
        this.fromEmail = this.configService.get('FROM_EMAIL') || 'noreply@collabvortex.com';
        this.fromName = this.configService.get('FROM_NAME') || 'CollabVortex';
    }
    async sendPasswordResetEmail(to, resetToken) {
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
        }
        catch (error) {
            this.logger.error('Failed to send password reset email:', error);
            return false;
        }
    }
    async sendWelcomeEmail(to, userName) {
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
        }
        catch (error) {
            this.logger.error('Failed to send welcome email:', error);
            return false;
        }
    }
    async sendNotificationEmail(to, subject, message) {
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
        }
        catch (error) {
            this.logger.error('Failed to send notification email:', error);
            return false;
        }
    }
    async sendPasswordChangedEmail(to, userName) {
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
        }
        catch (error) {
            this.logger.error('Failed to send password changed email:', error);
            return false;
        }
    }
    getPasswordResetTemplate(resetUrl) {
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
    getWelcomeTemplate(userName) {
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
    getNotificationTemplate(subject, message) {
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
    getPasswordChangedTemplate(userName) {
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map