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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../common/services/email.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, emailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailService = emailService;
        this.resetTokens = new Map();
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);
        const user = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });
        try {
            await this.emailService.sendWelcomeEmail(user.email, user.email);
        }
        catch (error) {
            console.error('Failed to send welcome email:', error);
        }
        return this.generateTokens(user);
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.generateTokens(user);
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const user = await this.usersService.findOne(payload.sub);
            return this.generateTokens(user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async changePassword(userId, changePasswordDto) {
        const user = await this.usersService.findOne(userId);
        const isCurrentPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 12);
        await this.usersService.update(userId, { password: hashedNewPassword });
    }
    async resetPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return { message: 'If an account with that email exists, we have sent a password reset link.' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000);
        this.resetTokens.set(resetToken, { email, expires });
        try {
            await this.emailService.sendPasswordResetEmail(email, resetToken);
        }
        catch (error) {
            console.error('Failed to send password reset email:', error);
            throw new common_1.BadRequestException('Failed to send reset email');
        }
        this.cleanupExpiredTokens();
        return { message: 'If an account with that email exists, we have sent a password reset link.' };
    }
    async confirmPasswordReset(token, newPassword) {
        const tokenData = this.resetTokens.get(token);
        if (!tokenData || tokenData.expires < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const user = await this.usersService.findByEmail(tokenData.email);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await this.usersService.update(user.id, { password: hashedPassword });
        this.resetTokens.delete(token);
        return { message: 'Password reset successfully' };
    }
    cleanupExpiredTokens() {
        const now = new Date();
        for (const [token, data] of this.resetTokens.entries()) {
            if (data.expires < now) {
                this.resetTokens.delete(token);
            }
        }
    }
    async generateTokens(user) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map