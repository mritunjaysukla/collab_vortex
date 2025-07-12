import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ResetPasswordDto, ChangePasswordDto, AuthResponseDto, ConfirmResetPasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    confirmPasswordReset(confirmResetPasswordDto: ConfirmResetPasswordDto): Promise<{
        message: string;
    }>;
}
