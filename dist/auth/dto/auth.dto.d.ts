import { UserRole } from '../../common/enums';
export declare class RegisterDto {
    email: string;
    password: string;
    role: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ResetPasswordDto {
    email: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        role: UserRole;
    };
}
export declare class ConfirmResetPasswordDto {
    token: string;
    newPassword: string;
}
