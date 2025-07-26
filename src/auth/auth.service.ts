import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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
  private readonly logger = new Logger(AuthService.name);
  private resetTokens = new Map<string, { email: string; expires: Date }>();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {
    // Clean up expired tokens every hour
    setInterval(() => this.cleanupExpiredTokens(), 60 * 60 * 1000);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    this.logger.log(`Registration attempt for email: ${registerDto.email}`);

    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        this.logger.warn(`Registration failed: User already exists with email ${registerDto.email}`);
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await this.hashPassword(registerDto.password);

      // Create user
      const user = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
      });

      this.logger.log(`User successfully registered: ${user.id}`);

      // Send welcome email (non-blocking)
      this.sendWelcomeEmailAsync(user.email);

      return this.generateTokens(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      this.logger.error(`Registration failed for ${registerDto.email}:`, error.stack);
      throw new InternalServerErrorException('Registration failed. Please try again later.');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    this.logger.log(`Login attempt for email: ${loginDto.email}`);

    try {
      // Find user
      const user = await this.usersService.findByEmail(loginDto.email);
      if (!user) {
        this.logger.warn(`Login failed: User not found with email ${loginDto.email}`);
        throw new UnauthorizedException('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = await this.verifyPassword(loginDto.password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Login failed: Invalid password for user ${user.id}`);
        throw new UnauthorizedException('Invalid email or password');
      }

      this.logger.log(`User successfully logged in: ${user.id}`);

      // Get fresh user data to ensure we have the latest profile status
      const freshUser = await this.usersService.findOne(user.id);

      const payload = {
        email: freshUser.email,
        sub: freshUser.id,
        role: freshUser.role,
        isProfileComplete: freshUser.isProfileComplete || freshUser.isActive
      };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      });

      // Save refresh token
      await this.usersService.updateRefreshToken(freshUser.id, refreshToken);

      return {
        accessToken,
        refreshToken,
        user: {
          id: freshUser.id,
          email: freshUser.email,
          role: freshUser.role,
          isActive: freshUser.isActive,
          isProfileComplete: freshUser.isProfileComplete || freshUser.isActive
        }
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error(`Login failed for ${loginDto.email}:`, error.stack);
      throw new InternalServerErrorException('Login failed. Please try again later.');
    }
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    this.logger.log(`Password change attempt for user: ${userId}`);

    try {
      // Find user
      const user = await this.usersService.findOne(userId);
      if (!user) {
        this.logger.error(`Password change failed: User not found ${userId}`);
        throw new NotFoundException('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await this.verifyPassword(
        changePasswordDto.currentPassword,
        user.password,
      );

      if (!isCurrentPasswordValid) {
        this.logger.warn(`Password change failed: Invalid current password for user ${userId}`);
        throw new BadRequestException('Current password is incorrect');
      }

      // Validate new password isn't same as current
      const isSamePassword = await this.verifyPassword(
        changePasswordDto.newPassword,
        user.password,
      );

      if (isSamePassword) {
        throw new BadRequestException('New password must be different from current password');
      }

      // Hash and update new password
      const hashedNewPassword = await this.hashPassword(changePasswordDto.newPassword);
      await this.usersService.update(userId, { password: hashedNewPassword } as any);

      this.logger.log(`Password successfully changed for user: ${userId}`);

      // Send password changed notification email (non-blocking)
      this.sendPasswordChangedEmailAsync(user.email, user.email);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      this.logger.error(`Password change failed for user ${userId}:`, error.stack);
      throw new InternalServerErrorException('Password change failed. Please try again later.');
    }
  }

  async resetPassword(email: string): Promise<{ message: string }> {
    this.logger.log(`Password reset requested for email: ${email}`);

    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        this.logger.warn(`Password reset: User not found with email ${email}`);
        // Don't reveal if user exists or not for security
        return { message: 'If an account with that email exists, we have sent a password reset link.' };
      }

      if (!user.isActive) {
        this.logger.warn(`Password reset: Account deactivated for user ${user.id}`);
        // Don't reveal account status for security
        return { message: 'If an account with that email exists, we have sent a password reset link.' };
      }

      // Generate secure reset token
      const resetToken = this.generateResetToken();
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Store token
      this.resetTokens.set(resetToken, { email, expires });

      // Send reset email
      const emailSent = await this.sendPasswordResetEmailAsync(email, resetToken);
      if (!emailSent) {
        this.logger.error(`Failed to send password reset email to ${email}`);
        throw new InternalServerErrorException('Failed to send reset email');
      }

      this.logger.log(`Password reset email sent to: ${email}`);
      return { message: 'If an account with that email exists, we have sent a password reset link.' };
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }

      this.logger.error(`Password reset failed for ${email}:`, error.stack);
      throw new InternalServerErrorException('Password reset request failed. Please try again later.');
    }
  }

  async confirmPasswordReset(token: string, newPassword: string): Promise<{ message: string }> {
    this.logger.log(`Password reset confirmation attempt with token: ${token.substring(0, 8)}...`);

    try {
      // Validate token - try both original and URL decoded version
      let tokenData = this.resetTokens.get(token);
      let actualToken = token;

      if (!tokenData) {
        try {
          const decodedToken = decodeURIComponent(token);
          tokenData = this.resetTokens.get(decodedToken);
          if (tokenData) {
            actualToken = decodedToken;
          }
        } catch (error) {
          this.logger.warn(`Failed to decode token: ${error.message}`);
        }
      }

      if (!tokenData || tokenData.expires < new Date()) {
        this.logger.warn(`Password reset confirmation failed: Invalid or expired token`);
        throw new BadRequestException('Invalid or expired reset token');
      }

      // Find user
      const user = await this.usersService.findByEmail(tokenData.email);
      if (!user) {
        this.logger.error(`Password reset confirmation failed: User not found ${tokenData.email}`);
        throw new BadRequestException('User not found');
      }

      // Validate new password isn't same as current
      const isSamePassword = await this.verifyPassword(newPassword, user.password);
      if (isSamePassword) {
        throw new BadRequestException('New password must be different from current password');
      }

      // Hash and update password
      const hashedPassword = await this.hashPassword(newPassword);
      await this.usersService.update(user.id, { password: hashedPassword } as any);

      // Remove used token
      this.resetTokens.delete(actualToken);

      this.logger.log(`Password successfully reset for user: ${user.id}`);

      // Send confirmation email (non-blocking)
      this.sendPasswordChangedEmailAsync(user.email, user.email);

      return { message: 'Password reset successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(`Password reset confirmation failed:`, error.stack);
      throw new InternalServerErrorException('Password reset failed. Please try again later.');
    }
  }

  async validateResetToken(token: string): Promise<boolean> {
    if (!token) {
      return false;
    }

    // Try both the original token and URL decoded version
    let tokenData = this.resetTokens.get(token);
    if (!tokenData) {
      try {
        const decodedToken = decodeURIComponent(token);
        tokenData = this.resetTokens.get(decodedToken);
      } catch (error) {
        this.logger.warn(`Failed to decode token: ${error.message}`);
      }
    }

    return tokenData && tokenData.expires > new Date();
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    this.logger.log('Token refresh attempt');

    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // Find user and validate stored refresh token
      const user = await this.usersService.findOne(payload.sub);
      if (!user || user.refreshToken !== refreshToken) {
        this.logger.warn('Invalid refresh token provided');
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check if user is still active
      if (!user.isActive) {
        this.logger.warn(`Refresh token rejected: User ${user.id} is inactive`);
        throw new UnauthorizedException('Account is inactive');
      }

      // Generate new access token with fresh user data
      const newPayload = {
        email: user.email,
        sub: user.id,
        role: user.role,
        isProfileComplete: user.isProfileComplete || user.isActive
      };

      const accessToken = this.jwtService.sign(newPayload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION', '15m'),
      });

      this.logger.log(`Access token refreshed for user: ${user.id}`);

      return { accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error('Token refresh failed:', error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Private helper methods
  private async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 12);
    } catch (error) {
      this.logger.error('Password hashing failed:', error.stack);
      throw new InternalServerErrorException('Password processing failed');
    }
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      this.logger.error('Password verification failed:', error.stack);
      throw new InternalServerErrorException('Password verification failed');
    }
  }

  private generateResetToken(): string {
    try {
      return crypto.randomBytes(32).toString('hex');
    } catch (error) {
      this.logger.error('Token generation failed:', error.stack);
      throw new InternalServerErrorException('Token generation failed');
    }
  }

  private async generateTokens(user: User): Promise<AuthResponseDto> {
    try {
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
        isProfileComplete: user.isActive // Include profile completion status
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION', '15m'),
      });

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          isProfileComplete: user.isActive // Now this property is expected
        },
      };
    } catch (error) {
      this.logger.error('Token generation failed:', error.stack);
      throw new InternalServerErrorException('Authentication failed');
    }
  }

  private cleanupExpiredTokens(): void {
    const now = new Date();
    let cleanedCount = 0;

    for (const [token, data] of this.resetTokens.entries()) {
      if (data.expires < now) {
        this.resetTokens.delete(token);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      this.logger.log(`Cleaned up ${cleanedCount} expired reset tokens`);
    }
  }

  // Non-blocking email methods
  private async sendWelcomeEmailAsync(email: string): Promise<void> {
    try {
      await this.emailService.sendWelcomeEmail(email, email);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${email}:`, error.stack);
      // Don't throw error - email failure shouldn't block registration
    }
  }

  private async sendPasswordResetEmailAsync(email: string, token: string): Promise<boolean> {
    try {
      return await this.emailService.sendPasswordResetEmail(email, token);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}:`, error.stack);
      return false;
    }
  }

  private async sendPasswordChangedEmailAsync(email: string, userName: string): Promise<void> {
    try {
      await this.emailService.sendPasswordChangedEmail(email, userName);
    } catch (error) {
      this.logger.error(`Failed to send password changed email to ${email}:`, error.stack);
      // Don't throw error - email failure shouldn't block password change
    }
  }
}

