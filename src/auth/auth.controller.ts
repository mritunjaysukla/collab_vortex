import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Get,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  ResetPasswordDto,
  ChangePasswordDto,
  ConfirmResetPasswordDto,
  AuthResponseDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.login(loginDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    await this.authService.resetPassword(resetPasswordDto.email);
    return { message: 'If the email exists, a password reset link has been sent' };
  }

  @Post('confirm-reset-password')
  @ApiOperation({ summary: 'Confirm password reset with token' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async confirmResetPassword(@Body() confirmResetDto: ConfirmResetPasswordDto): Promise<{ message: string }> {
    return await this.authService.confirmPasswordReset(confirmResetDto.token, confirmResetDto.newPassword);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Current password is incorrect' })
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.changePassword(req.user.id, changePasswordDto);
    return { message: 'Password changed successfully' };
  }

  @Get('reset-password')
  @ApiOperation({ summary: 'Serve password reset form' })
  @ApiResponse({ status: 200, description: 'Password reset form served' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async getResetPasswordForm(
    @Query('token') token: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      return res.status(HttpStatus.BAD_REQUEST).send(`
        <html>
          <head><title>Invalid Reset Link</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h2>Invalid Reset Link</h2>
            <p>This password reset link is invalid or missing required information.</p>
          </body>
        </html>
      `);
    }

    // Validate token
    const isValid = await this.authService.validateResetToken(token);
    if (!isValid) {
      return res.status(HttpStatus.BAD_REQUEST).send(`
        <html>
          <head><title>Expired Reset Link</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h2>Reset Link Expired</h2>
            <p>This password reset link has expired or is invalid. Please request a new password reset.</p>
            <a href="http://localhost:3000/auth/forgot-password" style="color: #667eea;">Request New Reset</a>
          </body>
        </html>
      `);
    }

    // Serve password reset form
    const resetFormHtml = this.getPasswordResetFormHtml(token);
    return res.status(HttpStatus.OK).send(resetFormHtml);
  }

  private getPasswordResetFormHtml(token: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - CollabVortex</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 500px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
              margin: -30px -30px 30px -30px;
            }
            .form-group {
              margin-bottom: 20px;
            }
            label {
              display: block;
              margin-bottom: 5px;
              font-weight: bold;
            }
            input[type="password"] {
              width: 100%;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 5px;
              font-size: 16px;
              box-sizing: border-box;
            }
            .btn {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              border: none;
              border-radius: 25px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              width: 100%;
            }
            .btn:hover {
              opacity: 0.9;
            }
            .error {
              color: #dc3545;
              margin-top: 10px;
              display: none;
            }
            .success {
              color: #28a745;
              margin-top: 10px;
              display: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
              <p>Enter your new password below</p>
            </div>
            
            <form id="resetForm">
              <div class="form-group">
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" required minlength="6" 
                       placeholder="Enter your new password (min 6 characters)">
              </div>
              
              <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required 
                       placeholder="Confirm your new password">
              </div>
              
              <button type="submit" class="btn">Reset Password</button>
              
              <div id="error" class="error"></div>
              <div id="success" class="success"></div>
            </form>
          </div>

          <script>
            document.getElementById('resetForm').addEventListener('submit', async function(e) {
              e.preventDefault();
              
              const newPassword = document.getElementById('newPassword').value;
              const confirmPassword = document.getElementById('confirmPassword').value;
              const errorDiv = document.getElementById('error');
              const successDiv = document.getElementById('success');
              
              // Clear previous messages
              errorDiv.style.display = 'none';
              successDiv.style.display = 'none';
              
              // Validate passwords match
              if (newPassword !== confirmPassword) {
                errorDiv.textContent = 'Passwords do not match';
                errorDiv.style.display = 'block';
                return;
              }
              
              // Validate password length
              if (newPassword.length < 6) {
                errorDiv.textContent = 'Password must be at least 6 characters long';
                errorDiv.style.display = 'block';
                return;
              }
              
              try {
                const response = await fetch('/auth/confirm-reset-password', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    token: '${token}',
                    newPassword: newPassword
                  })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                  successDiv.textContent = 'Password reset successfully! You can now log in with your new password.';
                  successDiv.style.display = 'block';
                  document.getElementById('resetForm').style.display = 'none';
                  
                  // Redirect to login after 3 seconds
                  setTimeout(() => {
                    window.location.href = 'http://localhost:3000/auth/login';
                  }, 3000);
                } else {
                  errorDiv.textContent = data.message || 'Failed to reset password';
                  errorDiv.style.display = 'block';
                }
              } catch (error) {
                errorDiv.textContent = 'Network error. Please try again.';
                errorDiv.style.display = 'block';
              }
            });
          </script>
        </body>
      </html>
    `;
  }

}
