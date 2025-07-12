import { IsEmail, IsEnum, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123', minLength: 6 })
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.CREATOR })
  @IsEnum(UserRole)
  role: UserRole;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh-token-string' })
  refreshToken: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'currentPassword123' })
  currentPassword: string;

  @ApiProperty({ example: 'newPassword123', minLength: 6 })
  @MinLength(6)
  newPassword: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'jwt-access-token' })
  accessToken: string;

  @ApiProperty({ example: 'jwt-refresh-token' })
  refreshToken: string;

  @ApiProperty({
    example: {
      id: 'uuid-string',
      email: 'john@example.com',
      role: 'creator',
    },
  })
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export class ConfirmResetPasswordDto {
  @ApiProperty({ example: 'reset-token-from-email' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'newPassword123', minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
