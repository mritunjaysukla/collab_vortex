import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/services/email.service';
import {
  RegisterDto,
  LoginDto,
  AuthResponseDto,
  ChangePasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private resetTokens = new Map<string, { email: string; expires: Date }>(); // In production, use Redis or database

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) { }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Send welcome email
    try {
      await this.emailService.sendWelcomeEmail(user.email, user.email);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findOne(payload.sub);
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.usersService.findOne(userId);

    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 12);
    await this.usersService.update(userId, { password: hashedNewPassword } as any);
  }

  async resetPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return { message: 'If an account with that email exists, we have sent a password reset link.' };
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token (in production, use Redis or database)
    this.resetTokens.set(resetToken, { email, expires });

    // Send reset email
    try {
      await this.emailService.sendPasswordResetEmail(email, resetToken);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new BadRequestException('Failed to send reset email');
    }

    // Clean up expired tokens periodically
    this.cleanupExpiredTokens();

    return { message: 'If an account with that email exists, we have sent a password reset link.' };
  }

  async confirmPasswordReset(token: string, newPassword: string): Promise<{ message: string }> {
    const tokenData = this.resetTokens.get(token);

    if (!tokenData || tokenData.expires < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const user = await this.usersService.findByEmail(tokenData.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    await this.usersService.update(user.id, { password: hashedPassword } as any);

    // Remove used token
    this.resetTokens.delete(token);

    return { message: 'Password reset successfully' };
  }

  private cleanupExpiredTokens(): void {
    const now = new Date();
    for (const [token, data] of this.resetTokens.entries()) {
      if (data.expires < now) {
        this.resetTokens.delete(token);
      }
    }
  }

  private async generateTokens(user: User): Promise<AuthResponseDto> {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
