import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    private readonly resend;
    private readonly fromEmail;
    private readonly fromName;
    constructor(configService: ConfigService);
    sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean>;
    sendWelcomeEmail(to: string, userName: string): Promise<boolean>;
    sendNotificationEmail(to: string, subject: string, message: string): Promise<boolean>;
    sendPasswordChangedEmail(to: string, userName: string): Promise<boolean>;
    private getPasswordResetTemplate;
    private getWelcomeTemplate;
    private getNotificationTemplate;
    private getPasswordChangedTemplate;
}
