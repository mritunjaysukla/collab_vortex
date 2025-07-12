import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/services/email.service';
import { RegisterDto, LoginDto, AuthResponseDto, ChangePasswordDto } from './dto/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private emailService;
    private resetTokens;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, emailService: EmailService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    refreshToken(refreshToken: string): Promise<AuthResponseDto>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void>;
    resetPassword(email: string): Promise<{
        message: string;
    }>;
    confirmPasswordReset(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    private cleanupExpiredTokens;
    private generateTokens;
}
